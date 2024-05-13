import React from 'react';
import { User } from '../../types';
import { renderHashtag } from '../../utils';
import { Link, generatePath } from 'react-router-dom';
import { AppRoutes, UserRole } from '../../constants/constants';
import classNames from 'classnames';

interface UserCardThumbnailProps {
  user: User;
}

const UserCardThumbnail: React.FC<UserCardThumbnailProps> = ({ user }) => (
  <li className="users-catalog__item">
    <div
      className={classNames({
        'thumbnail-user thumbnail-user--role-user':
          user.roles === UserRole.sportsman,
        'thumbnail-user thumbnail-user--role-coach':
          user.roles === UserRole.coach,
      })}
    >
      <div className="thumbnail-user__image">
        <picture>
          <img src={user.avatar} width={82} height={82} alt="" />
        </picture>
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
        {user.typeOfTraining.map((type) => (
          <li className="thumbnail-user__hashtags-item" key={type}>
            <div className="hashtag thumbnail-user__hashtag">
              <span>{renderHashtag(type)}</span>
            </div>
          </li>
        ))}
      </ul>
      <Link
        className="btn btn--medium thumbnail-user__button"
        to={generatePath(AppRoutes.UserCard, {
          id: String(user.id),
        })}
      >
        Подробнее
      </Link>
    </div>
  </li>
);

export default UserCardThumbnail;
