"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import InputGroup from "@/components/InputGroup/InputGroup";
import GeoSelect from "@/components/Select/GeoSelect";
import { fieldsConfig } from "@/config/fieldsConfig";
import { geoOptions } from "@/config/geoOptions";

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
    geo: null,
  });

  const handleGeoChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, geo: selectedOption }));
    setErrors((prev) => ({
      ...prev,
      geo: selectedOption ? null : "Выберите ГЕО",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
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
    if (!formData.geo) {
      setErrors((prev) => ({ ...prev, geo: "Выберите ГЕО" }));
      return;
    }
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
      geo: null,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Введите данные</h2>
        <GeoSelect
          key={formData.geo}
          label="Выберите ГЕО"
          options={geoOptions}
          value={formData.geo}
          onChange={handleGeoChange}
          error={errors.geo}
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
          />
        ))}

        <button type="submit" className={styles.button}>
          Отправить
        </button>
      </form>
    </div>
  );
}
