import React from 'react';
import { PersonalTraining, User } from '../../types';
import { useUser } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/constants';
import { updatePersonalTraining } from '../../api/updatePersonalTraining';
import { getStatus, isInitiator, isInvited, renderHashtag } from '../../utils';
import classNames from 'classnames';

interface FriendCoachCardProps {
  initiator: User;
  personalTrainings: PersonalTraining[];
}

const FriendCoachCard: React.FC<FriendCoachCardProps> = ({
  initiator,
  personalTrainings,
}) => {
  const coach = useUser();

  const navigate = useNavigate();

  const changeStatus = useMutation({
    mutationKey: ['updateTraining'],
    mutationFn: (params: { requestTraining: PersonalTraining }) =>
      updatePersonalTraining(params.requestTraining),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('request update successfully', data);
    },
  });

  const handleButtonAcceptClick = () => {
    const value = {
      initiator: initiator.id,
      user: coach.id,
      status: 'принят',
    };

    changeStatus.mutate({ requestTraining: value });
  };

  const handleButtonRejectClick = () => {
    const value = {
      initiator: initiator.id,
      user: coach.id,
      status: 'отклонён',
    };

    changeStatus.mutate({ requestTraining: value });
  };

  return (
    <div className="thumbnail-friend">
      <div
        className="thumbnail-friend__info thumbnail-friend__info--theme-light"
        onClick={() =>
          navigate(
            generatePath(AppRoutes.UserCard, {
              id: String(initiator.id),
            })
          )
        }
      >
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <img src={initiator.avatar} width={78} height={78} alt="" />
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{initiator.name}</h2>
          <div className="thumbnail-friend__location">
            <svg width={14} height={16} aria-hidden="true">
              <use xlinkHref="#icon-location" />
            </svg>
            <address className="thumbnail-friend__location-address">
              {initiator.location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {initiator.typeOfTraining.map((type) => (
            <li key={type}>
              <div className="hashtag thumbnail-friend__hashtag">
                <span>{renderHashtag(type)}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div
            className={classNames('thumbnail-friend__ready-status', {
              'thumbnail-friend__ready-status--is-ready':
                initiator.readyToTrain,
              'thumbnail-friend__ready-status--is-not-ready':
                !initiator.readyToTrain,
            })}
            data-testid="ready-to-train-status"
          >
            {initiator.readyToTrain ? (
              <span> Готов к тренировке</span>
            ) : (
              <span>Не готов к тренировке</span>
            )}
          </div>
        </div>
      </div>
      {initiator.readyToTrain && (
        <>
          {isInvited(initiator.id, coach.id, personalTrainings) && (
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
              <p className="thumbnail-friend__request-text">
                Запрос на&nbsp;совместную тренировку
              </p>
              <div className="thumbnail-friend__button-wrapper">
                <button
                  className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                  type="button"
                  onClick={handleButtonAcceptClick}
                >
                  Принять
                </button>
                <button
                  className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                  type="button"
                  onClick={handleButtonRejectClick}
                >
                  Отклонить
                </button>
              </div>
            </div>
          )}
          {isInitiator(initiator.id, coach.id, personalTrainings) && (
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
              <p
                className="thumbnail-friend__request-text"
                data-testid="invitation-status"
              >
                {`Запрос на персональную тренировку ${getStatus(
                  initiator.id,
                  coach.id,
                  personalTrainings
                )}`}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FriendCoachCard;
