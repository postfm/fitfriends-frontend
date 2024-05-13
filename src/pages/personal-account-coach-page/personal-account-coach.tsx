import classNames from 'classnames';
import { AuthAppRoutes, TypesOfTrainings } from '../../constants/constants';
import { Coach } from '../../mocks/coach.mocks';
import { FormEvent, useState } from 'react';
import { LengthParameters } from '../../constants/validate.constants';
import accountCoachStyles from './personal-account-page.module.css';
import { Link } from 'react-router-dom';
import { CertificateImages } from '../../mocks/certificates.mock';
import CertificateSlider from './components/slider';

export default function PersonalAccountCoach(): JSX.Element {
  const certificates = CertificateImages;
  const currentCoach = { ...Coach };
  const [isEditing, setIsEditing] = useState(false);
  const [isSpecializationEmpty, setIsSpecializationEmpty] = useState(true);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsSpecializationEmpty(true);

    if (!isEditing) {
      setIsEditing(!isEditing);
      return;
    }

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const coachChangedDescription = {
      name: formData.get('name'),
      description: formData.get('description'),
      personalTrainings: !!formData.get('ready-for-training'),
      typeOfTraining: formData.getAll('specialization'),
    };

    if (!coachChangedDescription.typeOfTraining.length) {
      setIsSpecializationEmpty(false);
      return;
    }

    setIsEditing(!isEditing);
  };

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        name="user-photo-1"
                        accept="image/png, image/jpeg"
                      />
                      <span className="input-load-avatar__avatar">
                        <img
                          src={currentCoach.avatar}
                          width={98}
                          height={98}
                          alt="user photo"
                        />
                      </span>
                    </label>
                  </div>
                  <div
                    className={classNames('user-info-edit__controls hidden', {
                      'visually-hidden': !isEditing,
                    })}
                  >
                    {/* <div className="input-load-avatar">
                        <label>
                          <input
                            className="visually-hidden"
                            type="file"
                            accept="image/png, image/jpeg"
                          />
                          <span className="input-load-avatar__btn">
                            <svg width={20} height={20} aria-hidden="true">
                              <use xlinkHref="#icon-import" />
                            </svg>
                          </span>
                        </label> */}

                    <button
                      className="user-info-edit__control-btn"
                      aria-label="обновить"
                    >
                      <label>
                        <input
                          className="visually-hidden"
                          type="file"
                          accept="image/png, image/jpeg"
                        />

                        <svg width={16} height={16} aria-hidden="true">
                          <use xlinkHref="#icon-change" />
                        </svg>
                      </label>
                    </button>
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="удалить"
                    >
                      <svg width={14} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-trash" />
                      </svg>
                    </button>
                  </div>
                </div>
                <form
                  className="user-info-edit__form"
                  onSubmit={handleFormSubmit}
                >
                  <button
                    className="btn-flat btn-flat--underlined user-info-edit__save-button"
                    type="submit"
                    aria-label={!isEditing ? 'Редактировать' : 'Сохранить'}
                  >
                    <svg width={12} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    <span> {!isEditing ? 'Редактировать' : 'Сохранить'}</span>
                  </button>
                  {!isSpecializationEmpty && (
                    <p className={accountCoachStyles.specialization__error}>
                      Выберите хотя бы одну специализацию!
                    </p>
                  )}

                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div className="custom-input user-info-edit__input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="name"
                            defaultValue={currentCoach.name}
                            readOnly={!isEditing}
                            required
                            minLength={LengthParameters.MinLengthName}
                            maxLength={LengthParameters.MaxLengthName}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-textarea user-info-edit__textarea">
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          placeholder=" "
                          defaultValue={currentCoach.description}
                          readOnly={!isEditing}
                          required
                          minLength={LengthParameters.MinText}
                          maxLength={LengthParameters.MaxText}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section user-info-edit__section--status">
                    <h2 className="user-info-edit__title user-info-edit__title--status">
                      Статус
                    </h2>
                    <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                      <label>
                        <input
                          type="checkbox"
                          name="ready-for-training"
                          defaultChecked={!!currentCoach.personalTrainings}
                          disabled={!isEditing}
                        />
                        <span className="custom-toggle__icon">
                          <svg width={9} height={6} aria-hidden="true">
                            <use xlinkHref="#arrow-check" />
                          </svg>
                        </span>
                        <span className="custom-toggle__label">
                          Готов к персональным тренировкам
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title user-info-edit__title--specialization">
                      Специализация
                    </h2>
                    <div className="specialization-checkbox user-info-edit__specialization">
                      {TypesOfTrainings.map(
                        (typeOfTraining): JSX.Element => (
                          <div className="btn-checkbox" key={typeOfTraining}>
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue={typeOfTraining.toLowerCase()}
                                defaultChecked={currentCoach.typeOfTraining.includes(
                                  typeOfTraining.toLowerCase()
                                )}
                                disabled={!isEditing}
                              />
                              <span className="btn-checkbox__btn">
                                {typeOfTraining}
                              </span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">
                      {`ст. м. ${currentCoach.location}`}
                    </div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                    >
                      <span className="custom-select__text" />
                      <span className="custom-select__icon">
                        <svg width={15} height={6} aria-hidden="true">
                          <use xlinkHref="#arrow-down" />
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox"></ul>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">
                      {currentCoach.gender}
                    </div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                    >
                      <span className="custom-select__text" />
                      <span className="custom-select__icon">
                        <svg width={15} height={6} aria-hidden="true">
                          <use xlinkHref="#arrow-down" />
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox"></ul>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">
                      {currentCoach.levelOfTrain}
                    </div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                    >
                      <span className="custom-select__text" />
                      <span className="custom-select__icon">
                        <svg width={15} height={6} aria-hidden="true">
                          <use xlinkHref="#arrow-down" />
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox"></ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.MyTrainings}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-flash" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Мои тренировки
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.CreateTraining}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-add" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Создать тренировку
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.FriendList}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-friends" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.MyOrders}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-bag" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                        <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                            />
                            <img
                              src="img/content/thumbnails/nearest-gym-01.jpg"
                              srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                              width={330}
                              height={190}
                            />
                          </picture>
                        </div>
                        <div
                          className="thumbnail-spec-gym__header"
                          style={{ alignContent: 'center' }}
                        >
                          <h3 className="thumbnail-spec-gym__title">
                            Скоро тут будет интересно
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CertificateSlider certificates={certificates} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
