import React from "react";
import styles from "./InputGroup.module.scss";

const InputGroup = ({ name, formData, handleChange, errors, label }) => {
  return (
    <div
      key={name}
      className={`${styles.field} ${errors[name] ? styles.errorInput : ""}`}
    >
      <input
        type={name === "streamerLink" ? "url" : "number"}
        id={name}
        inputMode={name === "streamerLink" ? "none" : "decimal"}
        name={name}
        pattern={name === "streamerLink" && "\\d*"}
        value={formData[name]}
        onChange={handleChange}
        className={`${styles.input} `}
        autoComplete="off"
        required
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {errors[name] && <span className={styles.error}>{errors[name]}</span>}
    </div>
  );
};
export default InputGroup;
