import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { renderHashtag } from '../../utils';
import PopupModal from '../../components/modal/popup-modal';
import LocationMap from '../../components/location-map';
import { useQuery } from '@tanstack/react-query';
import { loadUser } from '../../api/loadUser';
import { useFriendQuery } from '../../hooks';

export default function UserCardUserPage(): JSX.Element {
  const { id } = useParams();
  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => loadUser(+(id as string)),
  }).data;
  const [locationMapOpen, setLocationMapOpen] = useState(false);
  const navigate = useNavigate();

  const { isFriend, addRemoveFriend } = useFriendQuery(Number(id));

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
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{user?.name}</h2>
                      </div>
                      <div className="user-card__label">
                        <a onClick={() => setLocationMapOpen(true)}>
                          <svg
                            className="user-card-coach__icon-location"
                            width={12}
                            height={14}
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-location" />
                          </svg>
                          <span>{user?.location}</span>
                        </a>
                      </div>
                      <div className="user-card__status">
                        <span>
                          {user?.readyToTrain
                            ? 'Готов к тренировке'
                            : 'Не готов к тренировке'}
                        </span>
                      </div>
                      <div className="user-card__text">
                        <p>{user?.description}</p>
                      </div>
                      <ul className="user-card__hashtag-list">
                        {user?.typeOfTraining.map((type) => (
                          <li className="user-card__hashtag-item" key={type}>
                            <div className="hashtag">
                              <span>{renderHashtag(type)}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn user-card__btn"
                        type="button"
                        onClick={addRemoveFriend}
                      >
                        {!isFriend ? 'Добавить в друзья' : 'Удалить из друзей'}
                      </button>
                    </div>
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item">
                          <img
                            src="/img/content/user-card-photo1.jpg"
                            srcSet="img/content/user-card-photo1@2x.jpg 2x"
                            width={334}
                            height={573}
                            alt="photo1"
                          />
                        </li>
                        <li className="user-card__gallary-item">
                          <img
                            src="/img/content/user-card-photo2.jpg"
                            srcSet="img/content/user-card-photo2@2x.jpg 2x"
                            width={334}
                            height={573}
                            alt="photo2"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PopupModal
        isOpen={locationMapOpen}
        title={user?.name}
        subtitle={user?.location}
        onClose={() => setLocationMapOpen(false)}
      >
        <LocationMap location={user?.location} />
      </PopupModal>
    </div>
  );
}
