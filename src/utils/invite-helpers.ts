import { RequestStatus } from './../constants/constants';
import { PersonalTraining } from '../types';

export const isInitiator = (
  initiator: number,
  user: number,
  personalTrainings: PersonalTraining[]
) =>
  personalTrainings.filter(
    (personalTraining) =>
      personalTraining.initiator === initiator && personalTraining.user === user
  ).length > 0;

export const isInvited = (
  initiator: number,
  user: number,
  personalTrainings: PersonalTraining[]
) =>
  personalTrainings.filter(
    (personalTraining) =>
      personalTraining.initiator === user && personalTraining.user === initiator
  ).length > 0;

export const isAnswered = (
  initiator: number,
  user: number,
  personalTrainings: PersonalTraining[]
) => {
  const personalTraining = personalTrainings.filter(
    (personalTraining) =>
      personalTraining.initiator === initiator && personalTraining.user === user
  );

  return (
    personalTraining[0].status === RequestStatus['accepted'] ||
    personalTraining[0].status === RequestStatus['rejected']
  );
};

export const getStatus = (
  initiator: number,
  user: number,
  personalTrainings: PersonalTraining[]
) =>
  personalTrainings.filter(
    (personalTraining) =>
      personalTraining.initiator === initiator && personalTraining.user === user
  )[0].status;
