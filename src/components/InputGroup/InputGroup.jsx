import styles from "./InputGroup.module.scss";
import QuestionSVG from "../../../public/Question";

const InputGroup = ({
  name,
  formData,
  handleChange,
  errors,
  label,
  hint,
  placeholder,
  activeHint,
  setActiveHint,
}) => {
  const toggleHint = () => {
    setActiveHint((prev) => (prev === name ? null : name));
  };

  const isHintVisible = activeHint === name;

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={name === "streamerLink" ? "url" : "number"}
          id={name}
          inputMode={name === "streamerLink" ? "text" : "decimal"}
          name={name}
          pattern={name === "streamerLink" ? "https://.*" : "\\d*"}
          value={formData[name] || ""}
          onChange={handleChange}
          className={`${styles.input} ${errors[name] ? styles.errorInput : ""}`}
          autoComplete="off"
          placeholder={placeholder}
        />
        <button
          type="button"
          className={styles.infoIcon}
          onClick={toggleHint}
          aria-label="Показать информацию"
        >
          <QuestionSVG color={isHintVisible ? "#0088ff" : "#ffffff"} />
        </button>
      </div>

      {errors[name] && (
        <div className={styles.errorMessage}>{errors[name]}</div>
      )}

      {isHintVisible && hint && (
        <div
          className={styles.infoText}
          dangerouslySetInnerHTML={{ __html: hint }}
        ></div>
      )}
    </div>
  );
};

export default InputGroup;
