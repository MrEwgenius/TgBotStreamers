"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react"

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { question: "Как оформить подписку?", answer: "Перейдите на страницу 'Подписка' и выберите подходящий вам план." },
    {
      question: "Как отменить подписку?",
      answer: "В вашем профиле найдите раздел 'Управление подпиской' и нажмите 'Отменить'.",
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем кредитные карты, PayPal и банковские переводы.",
    },
    {
      question: "Есть ли пробный период?",
      answer: "Да, мы предлагаем 7-дневный бесплатный пробный период для новых пользователей.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.faqContainer}>
      <h1>Часто задаваемые вопросы</h1>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <button className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
            <h2>{faq.question}</h2>
            {openIndex === index ? <ChevronUp color="#fff" size={24} /> : <ChevronDown color="#fff" size={24} />}
          </button>
          {openIndex === index && (
            <div className={styles.faqAnswer}>
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
      <a href="https://t.me/your_operator_username" className={styles.askButton}>
        <MessageCircle size={24} />
        <span>Задать вопрос</span>
      </a>
    </div>
  )
}

export default FAQPage

