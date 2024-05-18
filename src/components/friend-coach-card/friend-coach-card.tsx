import { FC } from 'react';
import { PersonalTraining, User } from '../../types';
import { useUser } from '../../hooks';
import { useQuery } from '@tanstack/react-query';
import { loadPersonalTraining } from '../../api/loadPersonalTraining';
import { generatePath, useNavigate } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';

interface FriendCoachCardProps {
  friend: User;
}

const FriendCoachCard: FC<FriendCoachCardProps> = ({ friend }) => {
  const currentTrainer = useUser();
  const navigate = useNavigate();
  const personalsTraining = useQuery({
    queryKey: ['personalsTraining'],
    queryFn: loadPersonalTraining,
  });

  const isCommonTraining = personalsTraining.data?.filter(
    (personalTraining) =>
      personalTraining.user === currentTrainer.id &&
      friend.id === personalTraining.initiator
  ) as PersonalTraining[];

  const handleItemClick = () => {
    navigate(generatePath(AuthAppRoutes.UserCard, { id: String(friend.id) }));
  };

  return (
    <li className="friends-list__item" onClick={handleItemClick}>
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={friend.image} width={78} height={78} alt="" />
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{friend.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width={14} height={16} aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">
                {friend.location}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            <li>
              <div className="hashtag thumbnail-friend__hashtag">
                <span>#{friend.typeOfTraining.join(' #')}</span>
              </div>
            </li>
          </ul>
          {friend.readyToTrain ? (
            <div className="thumbnail-friend__activity-bar">
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                <span>Готов к&nbsp;тренировке</span>
              </div>
            </div>
          ) : (
            <div className="thumbnail-friend__activity-bar">
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                <span>Не&nbsp;готов к&nbsp;тренировке</span>
              </div>
            </div>
          )}
        </div>
        {/* {isCommonTraining.length > 0 && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              Запрос на&nbsp;персональную тренировку
            </p>
            <div className="thumbnail-friend__button-wrapper">
              <button
                className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                type="button"
              >
                Принять
              </button>
              <button
                className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                type="button"
              >
                Отклонить
              </button>
            </div>
          </div>
        )} */}
      </div>
    </li>
  );
};

export default FriendCoachCard;
