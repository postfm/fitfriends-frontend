export const UnauthAppRoutes = {
  Login: '/login',
  Register: '/register',
  QuestionnaireAccountUser: '/questionnaire-user',
  QuestionnaireAccountCoach: '/questionnaire-coach',
} as const;

export const AuthAppRoutes = {
  Main: '/main',
  MyAccount: '/my-account',
  FriendList: '/friend-list',
  MyOrders: '/orders',
  MyPurchases: '/purchases',
  MyTrainings: '/trainings',
  CreateTraining: '/create-training',
  UserCatalogue: '/user-catalogue',
  TrainingCatalogue: '/training-catalogue',
  TrainingCard: '/training/:id',
  UserCard: '/user/:id',
  СoachCard: '/coach/:id',
} as const;

export const AppRoutes = {
  Root: '/',
  ...UnauthAppRoutes,
  ...AuthAppRoutes,
} as const;

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const UserRole = {
  sportsman: 'пользователь',
  coach: 'тренер',
} as const;

export const Locations = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
  'Тестовая',
];

export const TypesOfTrainings = [
  'Йога',
  'Бег',
  'Аэробика',
  'Бокс',
  'Пилатес',
  'Стретчинг',
  'Кроссфит',
];

export const TimeOfTraining = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  '80-100 мин',
];

export const GENDERS = ['женский', 'мужской', 'неважно'];

export const LEVEL_OF_TRAINS = ['новичок', 'любитель', 'профессионал'];

export const PRICE_WITH_DISCOUNT = 0.9;
