"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";

const faqData = [
  { question: "Вопрос первый?", answer: "Че-то там отвечаем на первый вопрос" },
  { question: "Второй вопрос?", answer: "Ответ бла бла бла" },
  {
    question: "Пятый вопрос?",
    answer:
      "Нет фанатзии, хз чё тут написать в ответ, пусть будет много текста. Якобы я тут что-то полезное рассказываю!",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.wrapContainer}>
        <h2 className={styles.title}>Часто задаваемые вопросы</h2>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.question}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className={styles.icon}>
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              className={`${styles.answerWrapper} ${
                openIndex === index ? styles.open : ""
              }`}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.supportLink}>
        <a
          href="https://t.me/maxksum"
          target="_blank"
          rel="noopener noreferrer"
        >
          Чат поддержки
        </a>
      </div>
    </div>
  );
};

export default Faq;
