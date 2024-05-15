import React, { useState } from 'react';
import { User } from '../../types';
import { renderHashtag } from '../../utils';
import classNames from 'classnames';
import { UserRole } from '../../constants/constants';
interface FriendsUserCardProps {
  user: User;
}

const FriendsUserCard: React.FC<FriendsUserCardProps> = ({ user }) => {
  const [isInvite, setIsInvite] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const handleButtonInvateClick = () => {
    setIsInvite(!isInvite);
  };

  const handleButtonAcceptClick = () => {
    setIsAccept(true);
  };

  const handleButtonRejectClick = () => {
    setIsReject(true);
  };

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div
          className={classNames('thumbnail-friend__info', {
            'thumbnail-friend__info--theme-light':
              user.roles === UserRole.sportsman,
            'thumbnail-friend__info--theme-dark': user.roles === UserRole.coach,
          })}
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
                'thumbnail-friend__ready-status--is-ready': user.readyToTrain,
                'thumbnail-friend__ready-status--is-not-ready':
                  !user.readyToTrain,
              })}
            >
              {user.readyToTrain ? (
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
                onClick={handleButtonInvateClick}
              >
                <svg
                  width={43}
                  height={46}
                  aria-hidden="true"
                  focusable="false"
                >
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
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
              <p className="thumbnail-friend__request-text">
                Запрос на&nbsp;персональную тренировку принят
              </p>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default FriendsUserCard;
