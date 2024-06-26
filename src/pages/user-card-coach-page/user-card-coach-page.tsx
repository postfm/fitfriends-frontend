import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loadUser } from '../../api/loadUser';
import React, { useState } from 'react';
import { renderHashtag } from '../../utils';
import PopupModal from '../../components/modal/popup-modal';
import LocationMap from '../../components/location-map';
import TrainingsSlider from '../user-card-coach-page/components/sliders/training-slider';
import CertificatePopupSlider from './components/sliders/certificate-popup.slider';
import { useFriendQuery } from '../../hooks';
import classNames from 'classnames';
import { loadCoachTraining } from '../../api/loadCoachTraining';

const UserCardCoachPage: React.FC = () => {
  const { id } = useParams();
  const user = useQuery({
    queryKey: ['user', id],
    queryFn: async () => (await loadUser(Number(id))).data,
  });

  const trainings = useQuery({
    queryKey: ['coachTrainings', id],
    queryFn: async () => (await loadCoachTraining(Number(id))).data,
  });

  const { isFriend, addRemoveFriend } = useFriendQuery(Number(id));

  const [locationMapOpen, setLocationMapOpen] = useState(false);
  const [certificatesSliderOpen, setCertificatesSliderOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  let certificates = user.data?.certificates?.split(',') || [];
  certificates =
    certificates.length < 3 ? [...certificates, ...certificates] : certificates;

  return (
    <div className="wrapper">
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                className="btn-flat inner-page__back"
                type="button"
                onClick={() => navigate(-1)}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">
                    Карточка пользователя роль тренер
                  </h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">
                            {user.data?.name}
                          </h2>
                        </div>
                        <div className="user-card-coach__label">
                          <a onClick={() => setLocationMapOpen(true)}>
                            <svg
                              className="user-card-coach__icon-location"
                              width={12}
                              height={14}
                              aria-hidden="true"
                            >
                              <use xlinkHref="#icon-location" />
                            </svg>
                            <span>{user.data?.location}</span>
                          </a>
                        </div>
                        <div className="user-card-coach__status-container">
                          <div className="user-card-coach__status user-card-coach__status--tag">
                            <svg
                              className="user-card-coach__icon-cup"
                              width={12}
                              height={13}
                              aria-hidden="true"
                            >
                              <use xlinkHref="#icon-cup" />
                            </svg>
                            <span>Тренер</span>
                          </div>
                          <div
                            className={classNames(
                              'user-card-coach__status user-card-coach__status--check',
                              {
                                'user-card-coach-2__status user-card-coach-2__status--check':
                                  !user.data?.personalTrainings,
                              }
                            )}
                          >
                            <span>
                              {user.data?.personalTrainings
                                ? 'Готов тренировать'
                                : 'Не готов тренировать'}
                            </span>
                          </div>
                        </div>
                        <div className="user-card-coach__text">
                          <p>{user.data?.description}</p>
                        </div>
                        <button
                          className="btn-flat user-card-coach__sertificate"
                          type="button"
                          onClick={() => setCertificatesSliderOpen(true)}
                        >
                          <svg width={12} height={13} aria-hidden="true">
                            <use xlinkHref="#icon-teacher" />
                          </svg>
                          <span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card-coach__hashtag-list">
                          {user.data?.typeOfTraining.map((type) => (
                            <li className="user-card__hashtag-item" key={type}>
                              <div className="hashtag">
                                <span>{renderHashtag(type)}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          className="btn user-card-coach__btn"
                          type="button"
                          onClick={addRemoveFriend}
                        >
                          {!isFriend
                            ? 'Добавить в друзья'
                            : 'Удалить из друзей'}
                        </button>
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item">
                            <img
                              src="/img/content/user-coach-photo1.jpg"
                              srcSet="/img/content/user-coach-photo1@2x.jpg 2x"
                              width={334}
                              height={573}
                              alt="photo1"
                            />
                          </li>
                          <li className="user-card-coach__gallary-item">
                            <img
                              src="/img/content/user-coach-photo2.jpg"
                              srcSet="/img/content/user-coach-photo2@2x.jpg 2x"
                              width={334}
                              height={573}
                              alt="photo2"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <TrainingsSlider
                    trainings={trainings.data}
                    isFriend={isFriend}
                    coach={user.data}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PopupModal
        isOpen={locationMapOpen}
        title={user.data?.name}
        subtitle={user.data?.location}
        onClose={() => setLocationMapOpen(false)}
      >
        <LocationMap location={user.data?.location} />
      </PopupModal>
      <PopupModal
        isOpen={certificatesSliderOpen}
        title="Сертификаты"
        onClose={() => setCertificatesSliderOpen(false)}
      >
        <CertificatePopupSlider certificates={certificates} />
      </PopupModal>
    </div>
  );
};

export default UserCardCoachPage;
