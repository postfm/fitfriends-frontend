import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/constants';
import { useAuth, useUser } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import UserPersonalInfoCard from '../../components/user-personal-info-card';
import { User } from '../../types';
import { updateUser } from '../../api/updateUser';
import { useState } from 'react';

const DAYS_IN_WEEK = 7;

export default function PersonalAccountUserPage(): JSX.Element {
  const currentUser = useUser();
  const { saveCurrentUser } = useAuth();

  const [caloriesPerDay, setCaloriesPerDay] = useState(
    currentUser.caloriesPerDay || 0
  );
  const newUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (params: { user: User }) => updateUser(params.user),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('user updated successfuly');
      saveCurrentUser(data);
    },
  });

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserPersonalInfoCard
                onUserSave={(user) => newUser.mutate({ user })}
              />
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">
                              План на день, ккал
                            </span>
                            <input
                              type="number"
                              name="schedule-for-the-day"
                              value={caloriesPerDay}
                              onChange={(e) =>
                                setCaloriesPerDay(Number(e.target.value))
                              }
                            />
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">
                              План на неделю, ккал
                            </span>
                            <input
                              type="number"
                              name="schedule-for-the-week"
                              value={caloriesPerDay * DAYS_IN_WEEK}
                              onBlur={(e) =>
                                setCaloriesPerDay(
                                  Math.floor(
                                    Number(e.target.value) / DAYS_IN_WEEK
                                  )
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__additional-info">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoutes.FriendList}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoutes.MyPurchases}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span>
                    </Link>
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                          />
                          <img
                            src="/img/content/thumbnails/nearest-gym-01.jpg"
                            srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                            width="330"
                            height="190"
                            alt=""
                          />
                        </picture>
                      </div>
                      <div
                        className="thumbnail-spec-gym__header"
                        style={{ alignContent: 'center' }}
                      >
                        <h3 className="thumbnail-spec-gym__title">
                          Скоро тут появится что-то полезное
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
