"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./GeoSelect.module.scss"
import QuestionSVG from "../../../public/Question"
import { ChevronDown, ChevronUp } from "lucide-react"

const GeoSelect = ({ label, options, value, onChange, error, activeHint, setActiveHint }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const selectRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  const toggleHint = (e) => {
    e.stopPropagation()
    setActiveHint((prev) => (prev === "geo" ? null : "geo"))
  }

  const isHintVisible = activeHint === "geo"

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Блокировка прокрутки страницы при открытом выпадающем списке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel}>{label}</label>
        <div className={styles.selectWrapper}>
          <div
            ref={selectRef}
            className={`${styles.select} ${error ? styles.errorSelect : ""}`}
            onClick={toggleDropdown}
          >
            {isOpen ? (
              <ChevronUp className={styles.chevronIcon} size={26} />
            ) : (
              <ChevronDown className={styles.chevronIcon} size={26} />
            )}
            {value ? <div className={styles.value}>{value.label}</div> : <div className={styles.empty}>Выберите</div>}
          </div>

          {!isOpen && <button type="button" className={styles.infoIcon} onClick={toggleHint} aria-label="Показать информацию">
            <QuestionSVG color={isHintVisible ? "#0088ff" : "#ffffff"} />
          </button>}
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {isHintVisible && !isOpen && (
          <div className={styles.infoText}>Выберите регион, для которого вы хотите рассчитать стоимость интеграции</div>
        )}

        {isOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            {options.map((option) => (
              <div key={option.value} className={styles.option} onClick={() => handleOptionClick(option)}>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default GeoSelect

