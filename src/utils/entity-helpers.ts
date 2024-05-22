import { Role, User } from '../types';

export const isCoach = (user: User) => user.roles[0] === Role.coach;

export const isUser = (user: User) => user.roles[0] === Role.user;
