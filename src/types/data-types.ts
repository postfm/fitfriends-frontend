export enum UserGender {
  all = 'неважно',
  male = 'мужской',
  female = 'женский',
}

export enum TrainingGender {
  all = 'для всех',
  male = 'для мужчин',
  female = 'для женщин',
}

export enum Role {
  coach = 'тренер',
  user = 'пользователь',
}

export interface Training {
  trainingId: number;
  name: string;
  image: string;
  level: string;
  type: string;
  duration: string;
  price: number;
  calories: number;
  description: string;
  gender: string;
  video: string;
  rating: number;
  specialOffer: boolean;
  // TODO: Date
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
  gender: string;
  birthday: string;
  roles: string;
  description: string;
  location: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  levelOfTrain: string;
  typeOfTraining: string[];
  timeOfTraining: string | null;
  caloriesToLose: number | null;
  caloriesPerDay: number | null;
  readyToTrain: boolean | null;
  certificates: string | null;
  merits: string | null;
  personalTrainings: boolean | null;
  refreshToken: string;
  trainings: Training[];
}

export interface PersonalTraining {
  initiator: number;
  user: number;
  status: string;
}

export interface MyOrder {
  type: string;
  price: number;
  amount: number;
  sum: number;
  pay: string;
  training: Training;
  user: User;
}

export interface Review {
  id: number;
  grade: number;
  text: string;
  createdAt: string;
}

export const Positions = {
  ['Пионерская']: [60.00325466185073, 30.296016162457548],
  ['Петроградская']: [59.96674350696821, 30.311429528073464],
  ['Удельная']: [60.01698680552572, 30.313872774463007],
  ['Звёздная']: [59.8333958032954, 30.34858591086744],
  ['Спортивная']: [59.95158563911932, 30.29279231417399],
} as const;
