"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import InputGroup from "@/components/InputGroup/InputGroup";
import GeoSelect from "@/components/Select/GeoSelect";
import { fieldsConfig } from "@/config/fieldsConfig";
import { geoOptions } from "@/config/geoOptions";
import PayButton from "@/components/PayButton/PayButton";
import { Popup } from "@/components/Popup/Popup";
import { BottomTabs } from "@/components/BottomTabs/BottomTabs";
import { useSearchParams } from "next/navigation"; 


export default function Home() {
  const searchParams = useSearchParams();
  const userIdFromUrl = searchParams.get("user_id");
  
  console.log( userIdFromUrl);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    streamerLink: "",
    broadcasts: "",
    ftdCount: "",
    ftdSum: "",
    depositsCount: "",
    depositsSum: "",
    geoBet: "",
    performancePrice: "",
    agentCommission: "",
    geo: null,
  });

  const [results, setResults] = useState(null);
  const [streamerLink, setStreamerLink] = useState("");
  const [activeHint, setActiveHint] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const formRef = useRef(null);
  const resultsRef = useRef(null);

  // Закрытие подсказки при клике вне формы или другого поля
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveHint(null); // Сбрасываем активную подсказку
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGeoChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, geo: selectedOption }));
    setErrors((prev) => ({
      ...prev,
      geo: selectedOption ? null : "Выберите ГЕО",
    }));
    setActiveHint(null);
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Поле обязательно для заполнения";
      } else if (key === "streamerLink" && !isValidStreamerURL(formData[key])) {
        newErrors[key] = "Введите корректную ссылку на стримера";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidStreamerURL = (url) => {
    try {
      const urlPattern = /^(https:\/\/(www\.)?(twitch\.tv|kick\.com|youtube\.com|youtu\.be)\/)/;
      return urlPattern.test(url);
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!value.trim()) {
        newErrors[name] = "Поле обязательно для заполнения";
      } else if (name === "streamerLink" && !isValidStreamerURL(value)) {
        newErrors[name] = "Введите корректную ссылку на стримера (Twitch, Kick, YouTube)";
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.geo) {
        setErrors((prev) => ({ ...prev, geo: "Выберите ГЕО" }));
        return;
      }
      if (!validateFields()) {
        console.log("Валидация не пройдена");
        return;
      }

      const transformedData = {
        ...formData,
        broadcasts: parseInt(formData.broadcasts),
        ftdCount: parseInt(formData.ftdCount),
        ftdSum: parseFloat(formData.ftdSum),
        depositsCount: parseInt(formData.depositsCount),
        depositsSum: parseFloat(formData.depositsSum),
        geoBet: parseInt(formData.geoBet),
        performancePrice: parseFloat(formData.performancePrice),
        agentCommission: parseInt(formData.agentCommission),
      };

      // console.log("Отправка данных:", transformedData);
      const response = await fetch("https://holstenmain.com/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResults(result);
      setStreamerLink(formData.streamerLink);
      // console.log("Ответ от сервера:", result);
      const newHistoryEntry = {
        date: new Date().toISOString(),
        streamerLink: formData.streamerLink,
        results: result,
      };
      const storedHistory = JSON.parse(localStorage.getItem("calculationHistory") || "[]");
      storedHistory.unshift(newHistoryEntry); // Добавляем новый расчёт в начало списка
      localStorage.setItem("calculationHistory", JSON.stringify(storedHistory));

      setFormData({
        streamerLink: "",
        broadcasts: "",
        ftdCount: "",
        ftdSum: "",
        depositsCount: "",
        depositsSum: "",
        geoBet: "",
        performancePrice: "",
        agentCommission: "",
        geo: null,
      });
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };
  // Скролл вниз при появлении результатов
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  // Проверка первого посещения
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

 

  return (
    <div className={styles.container}>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Введите данные</h2>
      <div>{userIdFromUrl}</div>
        <GeoSelect
          key={formData.geo}
          label="Выберите ГЕО"
          options={geoOptions}
          value={formData.geo}
          onChange={handleGeoChange}
          error={errors.geo}
          activeHint={activeHint}
          setActiveHint={setActiveHint}
        />
        {fieldsConfig.map((field) => (
          <InputGroup
            key={field.name}
            name={field.name}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            label={field.label}
            hint={field.hint}
            activeHint={activeHint}
            setActiveHint={setActiveHint}
          />
        ))}

        <button type="submit" className={styles.button}>
          Отправить
        </button>
      </form>
      {/* Итоги расчётов */}
      {results && (
        <div className={styles.results} ref={resultsRef}>
          <h2>Итоги расчётов</h2>
          <p>
            <span>Стример:</span> {streamerLink}
          </p>
          <p>
            <span>Цена заказчика: </span> <span>{results.clientPrice} $</span>
          </p>
          <p>
            <span>Средняя сумма чека одного FTD:</span>{" "}
            <span>{results.avgFtdAmount} $</span>
          </p>
          <p>
            <span>Цена 1 игрока:</span> <span>{results.pricePerPlayer} $</span>
          </p>
          <p>
            <span>Отличие цены:</span> <span>{results.priceDifference} %</span>
          </p>
          <p>
            <span>Предлагаемое уменьшение цены стримера: </span>
            <span>{results.proposedDiscount} %</span>
          </p>
          <p>
            <span>Цена заказчика по нашим расчетам: </span>
            <span>{results.finalClientPrice} $</span>
          </p>
          <p>
            <span>Цена исполнителя по нашим расчетам: </span>
            <span>{results.finalStreamerPrice} $</span>
          </p>
        </div>
      )}
     
    </div>
  );
}
