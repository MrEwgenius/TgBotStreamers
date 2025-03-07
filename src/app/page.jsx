"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./page.module.scss"
import InputGroup from "@/components/InputGroup/InputGroup"
import GeoSelect from "@/components/Select/GeoSelect"
import { fieldsConfig } from "@/config/fieldsConfig"
import { geoOptions } from "@/config/geoOptions"
import { Popup } from "@/components/Popup/Popup"
import BottomTabs from "@/components/BottomTabs/BottomTabs"
import { useTelegramViewport } from "@/config/tgMiniApp"

export default function Home() {
  useTelegramViewport()
 
  const [errors, setErrors] = useState({})
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
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [results, setResults] = useState(null)
  const [streamerLink, setStreamerLink] = useState("")
  const [activeHint, setActiveHint] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const formRef = useRef(null)
  const resultsRef = useRef(null)

  // Проверка валидности формы при изменении данных
  useEffect(() => {
    const checkFormValidity = () => {
      // Проверяем, что все поля заполнены и нет ошибок
      const allFieldsFilled = Object.keys(formData).every((key) => {
        return formData[key] !== null && formData[key] !== ""
      })

      const noErrors = Object.keys(errors).length === 0

      // Дополнительная проверка для streamerLink
      const isStreamerLinkValid = formData.streamerLink ? isValidStreamerURL(formData.streamerLink) : false

      setIsFormValid(allFieldsFilled && noErrors && isStreamerLinkValid)
    }

    checkFormValidity()
  }, [formData, errors])

  // Закрытие подсказки при клике вне формы или другого поля
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveHint(null) // Сбрасываем активную подсказку
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleGeoChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, geo: selectedOption }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (selectedOption) {
        delete newErrors.geo
      } else {
        newErrors.geo = "Выберите ГЕО"
      }
      return newErrors
    })
    setActiveHint(null)
  }

  const validateFields = () => {
    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Поле обязательно для заполнения"
      } else if (key === "streamerLink" && !isValidStreamerURL(formData[key])) {
        newErrors[key] = "Введите корректную ссылку на стримера (Twitch, Kick, YouTube)"
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidStreamerURL = (url) => {
    try {
      const urlPattern = /^(https:\/\/(www\.)?(twitch\.tv|kick\.com|youtube\.com|youtu\.be)\/)/
      return urlPattern.test(url)
    } catch (_) {
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => {
      const newErrors = { ...prev }
      if (!value.trim()) {
        newErrors[name] = "Поле обязательно для заполнения"
      } else if (name === "streamerLink" && !isValidStreamerURL(value)) {
        newErrors[name] = "Введите корректную ссылку на стримера (Twitch, Kick, YouTube)"
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.geo) {
        setErrors((prev) => ({ ...prev, geo: "Выберите ГЕО" }))
        return
      }
      if (!validateFields()) {
        console.log("Валидация не пройдена")
        return
      }

      const transformedData = {
        ...formData,
        broadcasts: Number.parseInt(formData.broadcasts),
        ftdCount: Number.parseInt(formData.ftdCount),
        ftdSum: Number.parseFloat(formData.ftdSum),
        depositsCount: Number.parseInt(formData.depositsCount),
        depositsSum: Number.parseFloat(formData.depositsSum),
        geoBet: Number.parseInt(formData.geoBet),
        performancePrice: Number.parseFloat(formData.performancePrice),
        agentCommission: Number.parseInt(formData.agentCommission),
      }

      const response = await fetch("https://holstenmain.com/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setResults(result)
      setStreamerLink(formData.streamerLink)

      const newHistoryEntry = {
        date: new Date().toISOString(),
        streamerLink: formData.streamerLink,
        results: result,
      }
      const storedHistory = JSON.parse(localStorage.getItem("calculationHistory") || "[]")
      storedHistory.unshift(newHistoryEntry) // Добавляем новый расчёт в начало списка
      localStorage.setItem("calculationHistory", JSON.stringify(storedHistory))

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
      })

      // Сбрасываем состояние валидности формы
      setIsFormValid(false)
    } catch (error) {
      console.error("Ошибка при отправке:", error)
    }
  }

  // Скролл вниз при появлении результатов
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [results])

  // Проверка первого посещения
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup")
    if (!hasSeenPopup) {
      setShowPopup(true)
      localStorage.setItem("hasSeenPopup", "true")
    }
  }, [])
  

  return (
    <div className={styles.container}>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          Рассчитайте <br /> реальную стоимость <br /> интеграции стримера
          <span className={styles.rocketIcon}>🚀</span>
        </h2>

        {/* <Suspense fallback={<div>Загрузка...</div>}>
          <div>
            <SearchParamsComponent />
          </div>
        </Suspense> */}

        <GeoSelect
          key={formData.geo}
          label="ГЕО"
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
            placeholder={field.placeholder}
            activeHint={activeHint}
            setActiveHint={setActiveHint}
          />
        ))}

        <button
          type="submit"
          className={`${styles.button} ${!isFormValid ? styles.buttonDisabled : ""}`}
          disabled={!isFormValid}
        >
          Отправить
        </button>
      </form>

      {/* Итоги расчётов */}
      {results && (
        <div className={styles.results} ref={resultsRef}>
          <h2>Итоги расчётов</h2>
          <p>
            <span>Стример:</span> <span>{streamerLink}</span>
          </p>
          <p>
            <span>Цена заказчика: </span> <span>{results.clientPrice} $</span>
          </p>
          <p>
            <span>Средняя сумма чека одного FTD:</span> <span>{results.avgFtdAmount} $</span>
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

      <BottomTabs />
    </div>
  )
}

