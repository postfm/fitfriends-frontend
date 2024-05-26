export enum UserGender {
  all = 'неважно',
  male = 'мужской',
  female = 'женский',
}

export enum TrainingGender {
  'неважно' = 'для всех',
  'мужской' = 'для мужчин',
  'женский' = 'для женщин',
}

export enum Role {
  coach = 'тренер',
  user = 'пользователь',
}

export interface Training {
  training_id: number;
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
  createdAt?: string;
  updatedAt?: string;
  reviews?: Review[];
  user?: Omit<User, 'trainings' | 'reviews' | 'orders' | 'balance'>;
}

export type NewTraining = Omit<
  Training,
  'training_id' | 'createdAt' | 'updatedAt' | 'user' | 'reviews' | 'orders'
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
  orders?: Omit<Order, 'user' | 'training'>[];
  trainings?: Omit<Training, 'reviews' | 'user'>[];
}

export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export interface Subscription {
  id: number;
  subscriber_id: number;
  trainer_id: number;
  email: string;
}

export type NewSubscription = Omit<
  Subscription,
  'id' | 'subscriber_id' | 'trainer_id'
>;

export interface PersonalTraining {
  initiator: number;
  user: number;
  status: string;
}

export type NewPersonalTraining = Omit<PersonalTraining, 'initiator' | 'user'>;

export interface Order {
  id: number;
  type: string;
  price: number;
  amount: number;
  sum: number;
  pay: string;
  training: Training;
  user: User;
  cratedAt?: string;
  updatedAt?: string;
}

export interface Purchases extends Training {
  quantity: number;
  cost: number;
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

export type OrderAmountTraining = Omit<NewOrder, 'type' | 'price' | 'pay'>;

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
