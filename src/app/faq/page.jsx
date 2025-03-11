"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { ChevronDown, ChevronUp, MessageCircleMore } from "lucide-react"
import BottomTabs from "@/components/BottomTabs/BottomTabs"

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null) // По умолчанию ни один вопрос не открыт

  const faqs = [
    {
      question: "Как оформить подписку",
      answer: "Перейдите на страницу 'Подписка' и выберите подходящий вам план.",
    },
    {
      question: "Как отменить подписку",
      answer: "В вашем профиле найдите раздел 'Управление подпиской' и нажмите 'Отменить'.",
    },
    {
      question: "Способы оплаты",
      answer: "Мы принимаем кредитные карты, PayPal и банковские переводы.",
    },
    {
      question: "Пробный период",
      answer: "Да, мы предлагаем 7-дневный бесплатный пробный период для новых пользователей.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.title}>
        Узнайте больше <br /> о нашем сервисе <br /> или задайте вопрос
        <span className={styles.handIcon}>✍️</span>
      </h1>

      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <button className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
            {faq.question}
            {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          <div className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ""}`}>
            <div className={styles.faqAnswerContent}>
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}

      <button className={styles.askButton}>
        <MessageCircleMore size={20} />
        <span>Задать свой вопрос</span>
      </button>

      <BottomTabs />
    </div>
  )
}

export default FAQPage

