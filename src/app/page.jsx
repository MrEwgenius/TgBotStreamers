"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import InputGroup from "@/components/InputGroup/InputGroup";

export default function Home() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    streamerLink: "",
    broadcasts: "",
    ftdCount: "",
    ftdSum: "",
    depositsCount: "",
    depositsSum: "",
    geoBet: "",
    performerPrice: "",
    clientPrice: "",
  });

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Поле обязательно для заполнения";
      } else if (key === "streamerLink" && !isValidURL(formData[key])) {
        newErrors[key] = "Введите корректную ссылку на стримера";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidURL = (url) => {
    try {
      const urlPattern = /^(https:\/\/)/;
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
      } else if (name === "streamerLink" && !isValidURL(value)) {
        newErrors[name] = "Введите корректную ссылку на стримера";
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      console.log("Валидация не пройдена");
      return;
    }

    console.log("Отправка данных:", formData);

    setFormData({
      streamerLink: "",
      broadcasts: "",
      ftdCount: "",
      ftdSum: "",
      depositsCount: "",
      depositsSum: "",
      geoBet: "",
      performerPrice: "",
      clientPrice: "",
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Введите данные</h2>
        {[
          { name: "streamerLink", label: "Ссылка на стримера" },
          { name: "broadcasts", label: "Количество трансляций" },
          { name: "ftdCount", label: "Количество FTD" },
          { name: "ftdSum", label: "Сумма FTD" },
          { name: "depositsCount", label: "Количество депозитов" },
          { name: "depositsSum", label: "Сумма депозитов" },
          { name: "geoBet", label: "Ставка игрока на ГЕО" },
          { name: "performerPrice", label: "Цена исполнителя за интеграцию" },
          { name: "clientPrice", label: "Цена заказчика за интеграцию" },
        ].map((field) => (
          <InputGroup
            key={field.name}
            name={field.name}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            label={field.label}
          />
        ))}
       
        <button type="submit" className={styles.button}>
          Отправить
        </button>
      </form>
    </div>
  );
}
