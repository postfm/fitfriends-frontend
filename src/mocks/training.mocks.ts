export const Training = {
  trainingId: 1,
  name: 'CROSSFIT',
  image: 'img/content/thumbnails/training-01.jpg',
  level: 'новичок',
  type: 'кроссфит',
  duration: '10-30 мин',
  price: 150,
  calories: 1200,
  description:
    'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
  gender: 'для всех',
  video: 'img/content/training-video/Video_html_Academy.mov',
  rating: 2,
  specialOffer: false,
  createdAt: '2024-05-10T11:07:21.149Z',
  updatedAt: '2024-05-10T11:07:21.149Z',
  user: {
    id: 7,
    name: 'Rob',
    email: 'rob@trainer.com',
    avatar: 'img/content/thumbnails/friend-16.jpg',
    password: '$2b$10$R00qBZqGyQbeiqVRKa5gPO4KgSOjA2/KltD6IT5nif9lVrySLwyMe',
    gender: 'неважно',
    birthday: '2004-10-12T20:00:00.000Z',
    roles: 'тренер',
    description:
      'Персональный тренер и инструктор групповых программ с опытом  более 4х лет. Специализация: пилатес.',
    location: 'Спортивная',
    image: 'img/content/thumbnails/friend-16.jpg',
    createdAt: '2024-05-10T10:02:09.607Z',
    updatedAt: '2024-05-10T10:02:09.607Z',
    levelOfTrain: 'профессионал',
    typeOfTraining: ['пилатес'],
    timeOfTraining: null,
    caloriesToLose: null,
    caloriesPerDay: null,
    readyToTrain: null,
    certificates: 'img/content/certificates-and-diplomas/1.pdf',
    merits: 'Мастер спорта',
    personalTrainings: false,
    refreshToken:
      '$2b$10$66CBF125XKqtNO8ioe00XevADpTIDJIGVFSbLDqPWOgm2B1z15P86',
  },
  orders: [
    {
      id: 1,
      type: 'абонемент',
      price: 150,
      amount: 5,
      sum: 750,
      pay: 'mir',
      cratedAt: '2024-05-10T12:17:44.912Z',
    },
    {
      id: 7,
      type: 'абонемент',
      price: 100,
      amount: 25,
      sum: 2500,
      pay: 'umoney',
      cratedAt: '2024-05-10T12:18:18.888Z',
    },
  ],
};
