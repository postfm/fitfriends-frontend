import React, { useState } from 'react';
import { NewPersonalTraining, PersonalTraining, User } from '../../types';
import { useUser } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes, RequestStatus } from '../../constants/constants';
import { updatePersonalTraining } from '../../api/updatePersonalTraining';
import classNames from 'classnames';
import { isAnswered, isInvited, renderHashtag } from '../../utils';
import { toast } from 'react-toastify';
import Avatar from '../avatar';

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
  const [isAccept, setIsAccept] = useState(
    isAnswered(initiator.id, coach.id, personalTrainings)
  );
  const changeStatus = useMutation({
    mutationKey: ['updateTraining'],
    mutationFn: async (params: {
      initiatorId: number;
      requestTraining: NewPersonalTraining;
    }) =>
      (await updatePersonalTraining(params.initiatorId, params.requestTraining))
        .data,
    onSuccess: () => {
      setIsAccept(!isAccept);
      toast.success('request update successfully');
    },
  });

  const handleButtonAcceptClick = () => {
    const value = {
      status: RequestStatus.accepted,
    };

    changeStatus.mutate({ initiatorId: initiator.id, requestTraining: value });
  };

  const handleButtonRejectClick = () => {
    const value = {
      status: RequestStatus.rejected,
    };

    changeStatus.mutate({ initiatorId: coach.id, requestTraining: value });
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
              <Avatar src={initiator.avatar} width={78} height={78} />
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
      {coach.readyToTrain &&
        !isInvited(initiator.id, coach.id, personalTrainings) &&
        !isAccept && (
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
    </div>
  );
};

export default FriendCoachCard;
