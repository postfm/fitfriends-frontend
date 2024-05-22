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
  createdAt?: string;
  updatedAt?: string;
  reviews?: Review[];
  user?: Omit<User, 'trainings' | 'reviews' | 'orders' | 'balance'>;
}

export type NewTraining = Omit<
  Training,
  'trainingId' | 'createdAt' | 'updatedAt' | 'user' | 'reviews'
>;

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
  gender: string;
  birthday: string;
  roles: string;
  description: string | undefined;
  location: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  levelOfTrain: string;
  typeOfTraining: string[];
  timeOfTraining: string | null;
  caloriesToLose: number | null;
  caloriesPerDay: number | null;
  readyToTrain: boolean | null;
  certificates: string | null;
  merits: string | null;
  personalTrainings: boolean | null;
  refreshToken?: string;
  balance?: number | null;
  reviews?: Review[];
  orders?: Omit<Order, 'user' | 'trainings'>[];
  trainings?: Omit<Training, 'reviews' | 'user'>[];
}

export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export interface Subscription {
  id: number;
  subscriber_id: number;
  trainer_id: number;
  subscriber_email: string;
}

export interface PersonalTraining {
  initiator: number;
  user: number;
  status: string;
}

export interface Order {
  id: string;
  type: string;
  price: number;
  amount: number;
  sum: number;
  pay: string;
  training: Training;
  user: User;
  // TODO: Date
  cratedAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  grade: number;
  text: string;
  createdAt: string;
}

export interface NewReview {
  grade: number;
  text: string;
}

export const Positions = {
  ['Пионерская']: [60.00325466185073, 30.296016162457548],
  ['Петроградская']: [59.96674350696821, 30.311429528073464],
  ['Удельная']: [60.01698680552572, 30.313872774463007],
  ['Звёздная']: [59.8333958032954, 30.34858591086744],
  ['Спортивная']: [59.95158563911932, 30.29279231417399],
} as Record<string, [number, number]>;

export interface Notify {
  id: number;
  text: string;
  user: number;
  createdAt: string;
}

export interface NewOrder {
  type: string;
  price: number | undefined;
  amount: number;
  pay: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: { current: string };
  meta: {
    itemsPerPage: number;
    totalNumbers: number;
    currentPage: 1;
    totalPages: 0;
    sortBy: Record<string, []>[];
  };
}
