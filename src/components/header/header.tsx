import { Link, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../constants/constants';
import classNames from 'classnames';
import { useAuth, useUser } from '../../hooks';
import { isUser } from '../../utils/entity-helpers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { loadNotifications } from '../../api/loadNotifications';
import { getDateTime } from '../../utils/date-helpers';
import { useState } from 'react';
import { Notify } from '../../types';
import { deleteNotify } from '../../api/deleteNotify';

export default function Header() {
  const user = useUser();
  const { logoutCurrentUser } = useAuth();
  const myNotifications = useQuery({
    queryKey: ['myNotifications'],
    queryFn: loadNotifications,
  }).data;

  interface NotifyProps {
    notify: Notify;
  }

  function Notify({ notify }: NotifyProps): JSX.Element {
    const [isNotifyActive, setIsNotifyActive] = useState(true);

    const notifyDelete = useMutation({
      mutationKey: ['deleteNotify'],
      mutationFn: (params: { notifyId: number }) =>
        deleteNotify(params.notifyId),
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('Notify deleted successfull');
      },
    });

    const handleListClick = () => {
      setIsNotifyActive(false);
      notifyDelete.mutate({ notifyId: notify.id });
    };

    return (
      <li className="main-nav__subitem" onClick={handleListClick}>
        <a
          className={classNames('notification', {
            'is-active': isNotifyActive,
          })}
        >
          <p className="notification__text">{notify.text}</p>
          <time className="notification__time" dateTime="2023-12-23 12:35">
            {getDateTime(notify.createdAt)}
          </time>
        </a>
      </li>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoutes.Main}
          aria-label="Переход на главную"
        >
          <svg width={187} height={70} aria-hidden="true">
            <use xlinkHref="#logo" />
          </svg>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) =>
                  classNames('main-nav__link', {
                    'is-active': isActive && isUser(user),
                  })
                }
                to={AppRoutes.Main}
                aria-label="На главную"
              >
                <svg width={18} height={18} aria-hidden="true">
                  <use xlinkHref="#icon-home" />
                </svg>
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) =>
                  classNames('main-nav__link', { 'is-active': isActive })
                }
                to={AppRoutes.MyAccount}
                aria-label="Личный кабинет"
              >
                <svg width={16} height={18} aria-hidden="true">
                  <use xlinkHref="#icon-user" />
                </svg>
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) =>
                  classNames('main-nav__link', { 'is-active': isActive })
                }
                to={AppRoutes.FriendList}
                aria-label="Друзья"
              >
                <svg width={22} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-friends" />
                </svg>
              </NavLink>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <a className="main-nav__link" href="#" aria-label="Уведомления">
                <svg width={14} height={18} aria-hidden="true">
                  <use xlinkHref="#icon-notification" />
                </svg>
              </a>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  {myNotifications?.map((notification) => (
                    <Notify notify={notification} key={notification?.id} />
                  ))}
                </ul>
              </div>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <a
                className="main-nav__link"
                href="#"
                aria-label="Выход"
                onClick={logoutCurrentUser}
              >
                <img src="img/logout-icon.png" alt="" width={22} />
              </a>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg
                className="search__icon"
                width={20}
                height={20}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search" />
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item">
                <a className="search__link" href="#">
                  Бокс
                </a>
              </li>
              <li className="search__item">
                <a className="search__link is-active" href="#">
                  Бег
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Аэробика
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}
