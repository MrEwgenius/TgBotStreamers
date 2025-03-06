export const fieldsConfig = [
  {
    name: "streamerLink",
    placeholder:"https://kick.com/streamer",
    label: "Ссылка на стримера",
    hint: ` Укажите ссылку на профиль стримера на платформе, где он ведет свою деятельность. Это нужно для проверки активности и релевантности аудитории.`,
  },
  {
    name: "broadcasts",
    placeholder:"5",
    label: "Количество трансляций",
    hint: ` Укажите количество трансляций из статистики стримера за последние 30 дней. Это значение используется для расчета цены одного игрока. Информацию по всем стримам можно запросить у стримера.`,
  },
  {
    name: "ftdCount",
    placeholder:"100",
    label: "Количество FTD",
    hint: ` Укажите количество First Time Deposit (FTD) – уникальных пользователей, которые впервые сделали депозит, за последние 30 дней. Этот параметр отражает эффективность стримера в привлечении новых пользователей, а также необходим для расчета средней суммы депозита одного FTD.`,
  },
  {
    name: "ftdSum",
    placeholder:"0",
    label: "Сумма FTD",
    hint: ` Укажите общую сумму депозитов за последние 30 дней от новых пользователей, привлеченных рекламной кампанией. Этот параметр необходим для расчета средней суммы депозита одного FTD.`,
  },
  {
    name: "depositsCount",
    placeholder:"0",
    label: "Количество депозитов",
    hint: ` Укажите общее количество всех депозитов (не только от новых пользователей), за последние 30 дней.`,
  },
  {
    name: "depositsSum",
    placeholder:"0",
    label: "Сумма депозитов",
    hint: ` Укажите общую сумму всех депозитов, включая повторные, от пользователей, привлеченных этой кампанией.`,
  },
  {
    name: "geoBet",
    placeholder:"0",
    label: "Ставка игрока на GEO",
    hint: ` Этот параметр отражает среднюю стоимость привлечения одного игрока (CPA) в выбранном регионе (GEO). Он необходим для сравнения с ценой, предложенной исполнителем, чтобы определить отклонение в процентах. Зная разницу в процентах между ставкой исполнителя и средним рыночным показателем, вы сможете понять, насколько цена исполнителя выше или ниже стандартного значения для данного региона. Это позволяет более точно оценить экономическую целесообразность кампании и оптимизировать бюджет. Если у вас нет этой информации, запросите её у клиента.`,
  },
  {
    name: "performancePrice",
    placeholder:"10",
    label: "Цена исполнителя за интеграцию",
    hint: ` Укажите стоимость, которую берет стример за интеграцию. Это важный показатель для расчета общего бюджета кампании.`,
  },
  {
    name: "agentCommission",
    placeholder:"10",
    label: "Укажите процент агентской комиссии",
    hint: ` Укажите размер агентской комиссии в процентах, который учитывается при расчете общей стоимости интеграции. Этот параметр позволяет правильно распределить бюджет и учитывать затраты на услуги агентства.`,
  },
];
