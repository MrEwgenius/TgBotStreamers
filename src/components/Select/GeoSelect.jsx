"use client";
import React, { useState } from "react";
import Select from "react-select";
import styles from "./GeoSelect.module.scss";
import QuestionSVG from "../../../public/Question";
import { customStyles } from "@/styles/geoSelectStyle";

const GeoSelect = ({
  value,
  options,
  onChange,
  label,
  error,
  activeHint,
  setActiveHint,
}) => {
  
  const toggleHint = () => {
    setActiveHint((prev) => (prev === "geoSelect" ? null : "geoSelect"));
  };
  const isHintVisible = activeHint === "geoSelect";
  return (
    <div className={styles.geoSelect}>
      <label className={styles.label}>{label}</label>
      <Select
        onBlur={() => setActiveHint(null)} 
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        className={`${styles.SSSSSSS} ${error ? styles.error : ""}`}
        classNamePrefix="reactSelect"
        placeholder="Выберите ГЕО"
        isSearchable
        instanceId="geoSelect"
      />
      <span className={styles.hintIcon} onClick={toggleHint}>
        <QuestionSVG color={isHintVisible ? "red" : "#949494"} />
      </span>
      {isHintVisible && (
        <div
          className={styles.hint}
          dangerouslySetInnerHTML={{
            __html: `  <b>Описание:</b> Укажите страну или регион, на который будет ориентирована рекламная кампания. GEO (географический таргетинг) позволяет определить, где находится аудитория стримера.
        
            <br/><b>Формат ввода:</b> Выберите страну из выпадающего списка.
             
            <br/><b>Пример:</b> Россия, США, Германия`,
          }}
        ></div>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
export default GeoSelect;
