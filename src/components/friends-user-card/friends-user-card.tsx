import React, { useState } from 'react';
import { PersonalTraining, User } from '../../types';
import { getStatus, isInitiator, isInvited, renderHashtag } from '../../utils';
import classNames from 'classnames';
import { AppRoutes, UserRole } from '../../constants/constants';
import { useUser } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import { updatePersonalTraining } from '../../api/updatePersonalTraining';
import { generatePath, useNavigate } from 'react-router-dom';

interface FriendsUserCardProps {
  user: User;
  personalTrainings: PersonalTraining[];
}

const FriendsUserCard: React.FC<FriendsUserCardProps> = ({
  user,
  personalTrainings,
}) => {
  const [isInvite, setIsInvite] = useState(false);
  const initiator = useUser();

  const handleButtonInviteClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsInvite(!isInvite);
  };

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
      user: user.id,
      status: 'принят',
    };

    changeStatus.mutate({ requestTraining: value });
  };

  const handleButtonRejectClick = () => {
    const value = {
      initiator: initiator.id,
      user: user.id,
      status: 'отклонён',
    };

    changeStatus.mutate({ requestTraining: value });
  };

  return (
    <div className="thumbnail-friend">
      <div
        className={classNames('thumbnail-friend__info', {
          'thumbnail-friend__info--theme-light':
            user.roles[0] === UserRole.sportsman,
          'thumbnail-friend__info--theme-dark':
            user.roles[0] === UserRole.coach,
        })}
        onClick={() =>
          navigate(
            generatePath(AppRoutes.UserCard, {
              id: String(user.id),
            })
          )
        }
      >
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <img src={user.avatar} width={78} height={78} alt="" />
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{user.name}</h2>
          <div className="thumbnail-friend__location">
            <svg width={14} height={16} aria-hidden="true">
              <use xlinkHref="#icon-location" />
            </svg>
            <address className="thumbnail-friend__location-address">
              {user.location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {user.typeOfTraining.map((type) => (
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
                (user.readyToTrain && user.roles[0] === UserRole.sportsman) ||
                (user.personalTrainings && user.roles[0] === UserRole.coach),
              'thumbnail-friend__ready-status--is-not-ready':
                (!user.readyToTrain && user.roles[0] === UserRole.sportsman) ||
                (!user.personalTrainings && user.roles[0] === UserRole.coach),
            })}
          >
            {(user.readyToTrain && user.roles[0] === UserRole.sportsman) ||
            (user.personalTrainings && user.roles[0] === UserRole.coach) ? (
              <span> Готов к&nbsp;тренировке</span>
            ) : (
              <span>Не готов к&nbsp;тренировке</span>
            )}
          </div>
          {user.readyToTrain && (
            <button
              className={classNames('thumbnail-friend__invite-button', {
                'is-disabled': isInvite,
              })}
              type="button"
              onClick={handleButtonInviteClick}
            >
              <svg width={43} height={46} aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite" />
              </svg>
              <span className="visually-hidden">
                Пригласить друга на совместную тренировку
              </span>
            </button>
          )}
        </div>
      </div>
      {user.readyToTrain && (
        <>
          {isInvited(initiator.id, user.id, personalTrainings) && (
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
          {isInitiator(initiator.id, user.id, personalTrainings) && (
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
              <p className="thumbnail-friend__request-text">
                {`Запрос на персональную тренировку ${getStatus(
                  initiator.id,
                  user.id,
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

export default FriendsUserCard;
