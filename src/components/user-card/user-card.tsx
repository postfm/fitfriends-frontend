import { Link, generatePath } from 'react-router-dom';
import { User } from '../../types';
import { renderHashtag } from '../../utils';
import { AppRoutes } from '../../constants/constants';

interface UserCardProps {
  user: User;
}
const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <li className="look-for-company__item">
    <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
      <div className="thumbnail-user__image">
        <picture>
          <img
            src={user.image}
            srcSet={`${user.image}@2x.png 2x`}
            width={82}
            height={82}
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
        <svg width={12} height={12} aria-hidden="true">
          <use xlinkHref="#icon-crown" />
        </svg>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width={14} height={16} aria-hidden="true">
            <use xlinkHref="#icon-location" />
          </svg>
          <address className="thumbnail-user__location-address">
            {user.location}
          </address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        <li className="thumbnail-user__hashtags-item">
          {user.typeOfTraining.map((type) => (
            <div key={type} className="hashtag thumbnail-user__hashtag">
              <span>{renderHashtag(type)}</span>
            </div>
          ))}
        </li>
      </ul>
      <Link
        className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
        to={generatePath(AppRoutes.UserCard, {
          id: String(user.id),
        })}
      >
        Подробнее
      </Link>
    </div>
  </li>
);

export default UserCard;
