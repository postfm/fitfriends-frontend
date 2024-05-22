import { Role, User } from '../types';

export const isCoach = (user: User) => user.roles === Role.coach;

export const isUser = (user: User) => user.roles === Role.user;
