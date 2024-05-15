import { Link } from 'react-router-dom';
import {
  AppRoutes,
  Genders,
  LevelOfTraining,
  Locations,
  TypesOfTrainings,
} from '../../constants/constants';
import { useUser } from '../../hooks';
import { renderLocation } from '../../utils';
import { FormEvent, useState } from 'react';
import registerStyles from './personal-accaunt-user.module.css';
import classNames from 'classnames';

const DAYS_IN_WEEK = 7;

export default function PersonalAccountUserPage(): JSX.Element {
  const currentUser = useUser();
  const [isEdit, setIsEdit] = useState(false);
  const [level, setLevel] = useState(currentUser.levelOfTrain);
  const [gender, setGender] = useState(currentUser.gender);
  const [location, setLocation] = useState(currentUser.location);
  const [isChangeLevel, setIsChangeLevel] = useState(false);
  const [isChangeGender, setIsChangeGender] = useState(false);
  const [isChangeLocation, setIsChangeLocation] = useState(false);

  const handleListLevelClick: React.MouseEventHandler<HTMLElement> = (evt) => {
    setLevel((evt.target as HTMLElement).innerText);
    setIsChangeLevel(!isChangeLevel);
  };

  const handleButtonLevelClick = () => {
    setIsChangeLevel(!isChangeLevel);
  };

  const handleListGenderClick: React.MouseEventHandler<HTMLElement> = (evt) => {
    setGender((evt.target as HTMLElement).innerText);
    setIsChangeGender(!isChangeGender);
  };

  const handleButtonGenderClick = () => {
    setIsChangeGender(!isChangeGender);
  };

  const handleListLocationClick: React.MouseEventHandler<HTMLElement> = (
    evt
  ) => {
    setLocation((evt.target as HTMLElement).innerText);
    setIsChangeLocation(!isChangeLocation);
  };

  const handleButtonLocationClick = () => {
    setIsChangeLocation(!isChangeLocation);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isEdit) {
      setIsEdit(!isEdit);
      return;
    }

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const userChanged = {
      name: formData.get('name'),
      description: formData.get('description'),
      readyToTrain: !!formData.get('ready-for-training'),
      typeOfTraining: formData.getAll('specialization'),
      location: location,
      gender: gender,
      levelOfTrain: level,
    };

    if (userChanged) {
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info">
                <div className="user-info__header">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className={'visually-hidden'}
                        type="file"
                        name="user-photo-1"
                        accept="image/png, image/jpeg"
                        disabled={!isEdit}
                      />
                      <span className="input-load-avatar__avatar">
                        <img
                          src={currentUser.avatar}
                          width="98"
                          height="98"
                          alt="user photo"
                        />
                      </span>
                    </label>
                  </div>
                </div>
                <form
                  className="user-info__form"
                  action="#"
                  method="post"
                  onSubmit={handleFormSubmit}
                >
                  <button
                    className="btn-flat btn-flat--underlined user-info__edit-button"
                    type="submit"
                    aria-label={!isEdit ? 'Редактировать' : 'Сохранить'}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
                  </button>
                  <div className="user-info__section">
                    <h2 className="user-info__title">Обо мне</h2>
                    <div className="custom-input custom-input--readonly user-info__input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="name"
                            defaultValue={currentUser.name}
                            disabled={!isEdit}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          placeholder=" "
                          disabled={!isEdit}
                        >
                          {currentUser.description}
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="user-info__section user-info__section--status">
                    <h2 className="user-info__title user-info__title--status">
                      Статус
                    </h2>
                    <div className="custom-toggle custom-toggle--switch user-info__toggle">
                      <label>
                        <input
                          type="checkbox"
                          name="ready-for-training"
                          defaultChecked={currentUser.readyToTrain as boolean}
                          disabled={!isEdit}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">
                          Готов к тренировкам
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info__section">
                    <h2 className="user-info__title user-info__title--specialization">
                      Специализация
                    </h2>
                    <div className="specialization-checkbox user-info__specialization">
                      {TypesOfTrainings.map((type) => (
                        <div className="btn-checkbox" key={type}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              name="specialization"
                              defaultValue={type.toLowerCase()}
                              defaultChecked={currentUser.typeOfTraining.includes(
                                type.toLowerCase()
                              )}
                              disabled={!isEdit}
                            />
                            <span className="btn-checkbox__btn">{type}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder"></div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      disabled={!isEdit}
                      onClick={handleButtonLocationClick}
                    >
                      <span
                        className="custom-select__text"
                        style={{ opacity: 1 }}
                      >
                        {renderLocation(location)}
                      </span>
                      <span
                        className="custom-select__icon"
                        style={isEdit ? { display: 'block' } : {}}
                      >
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul
                      className={classNames(
                        'custom-select__list',
                        isChangeLocation ? registerStyles.display_list : ''
                      )}
                      role="listbox"
                      style={
                        isChangeLocation
                          ? { visibility: 'visible', opacity: 1 }
                          : { visibility: 'hidden', opacity: 0 }
                      }
                      onClick={handleListLocationClick}
                    >
                      {Locations.map((location) => (
                        <li key={location}>{location}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
                    <span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder"></div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      disabled={!isEdit}
                      onClick={handleButtonGenderClick}
                    >
                      <span
                        className="custom-select__text"
                        style={{ opacity: 1 }}
                      >
                        {gender}
                      </span>
                      <span
                        className="custom-select__icon"
                        style={isEdit ? { display: 'block' } : {}}
                      >
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul
                      className={classNames(
                        'custom-select__list',
                        isChangeGender ? registerStyles.display_list : ''
                      )}
                      role="listbox"
                      style={
                        isChangeGender
                          ? { visibility: 'visible', opacity: 1 }
                          : { visibility: 'hidden', opacity: 0 }
                      }
                      onClick={handleListGenderClick}
                    >
                      {Genders.map((gender) => (
                        <li key={gender}>{gender}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
                    <span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder"></div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      disabled={!isEdit}
                      onClick={handleButtonLevelClick}
                    >
                      <span
                        className="custom-select__text"
                        style={{ opacity: 1 }}
                      >
                        {level}
                      </span>
                      <span
                        className="custom-select__icon"
                        style={isEdit ? { display: 'block' } : {}}
                      >
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul
                      className={classNames(
                        'custom-select__list',
                        isChangeLevel ? registerStyles.display_list : ''
                      )}
                      role="listbox"
                      style={
                        isChangeLevel
                          ? { visibility: 'visible', opacity: 1 }
                          : { visibility: 'hidden', opacity: 0 }
                      }
                      onClick={handleListLevelClick}
                    >
                      {LevelOfTraining.map((level) => (
                        <li key={level}>{level}</li>
                      ))}
                    </ul>
                  </div>
                </form>
              </section>
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
                              type="text"
                              name="schedule-for-the-day"
                              defaultValue={
                                currentUser.caloriesPerDay as number
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
                              type="text"
                              name="schedule-for-the-week"
                              value={
                                Number(currentUser.caloriesPerDay) *
                                DAYS_IN_WEEK
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
                      {/* <p className="thumbnail-spec-gym__type">Ближайший зал</p>  */}
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
