"use client";
import React, { useState } from "react";
import Select from "react-select";
import styles from "./GeoSelect.module.scss";
import QuestionSVG from "../../../public/Question";
import { customStyles } from "@/styles/geoSelectStyle";

const GeoSelect = ({ value, options, onChange, label, error }) => {

  const [showHint, setShowHint] = useState(false);
  const toggleHint = () => setShowHint((prev) => !prev);

  return (
    <div className={styles.geoSelect}>
      <label className={styles.label}>{label}</label>
      <Select
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
        <QuestionSVG color={showHint ? "red" : "#949494"} />
      </span>
      {showHint && <div className={styles.hint}>{"Выберите Гео"}</div>}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default GeoSelect;
