import { FormEvent, useState } from 'react';
import { LengthParameters } from '../../constants/validate.constants';
import { AppRoutes, Locations, UserRole } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import registerStyles from './sign-up-page.module.css';
import classNames from 'classnames';

export default function SignUpPage(): JSX.Element {
  const [isAgreement, setIsAgreement] = useState(true);
  const [isChangeLocation, setIsChangeLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const navigate = useNavigate();

  const handleUserAgreementOnClick = () => {
    setIsAgreement(!isAgreement);
  };

  const locationItems = Locations.map((loc) => <li key={loc}>{loc}</li>);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const userRegistration = {
      name: formData.get('name'),
      email: formData.get('email'),
      avatar: formData.get('avatar'),
      password: formData.get('password'),
      gender: formData.get('sex'),
      birthday: formData.get('birthday'),
      roles: formData.get('role'),
      location: location,
    };

    if (!userRegistration.location.length) {
      setIsLocationEmpty(false);
      return;
    }

    if (userRegistration.roles === UserRole.coach) {
      navigate(AppRoutes.QuestionnaireAccountCoach);
    } else {
      navigate(AppRoutes.QuestionnaireAccountUser);
    }
  };

  const handleButtonClick = () => {
    setIsChangeLocation(!isChangeLocation);
  };

  const handleListClick: React.MouseEventHandler<HTMLElement> = (evt) => {
    setLocation((evt.target as HTMLElement).innerText);
    setIsChangeLocation(!isChangeLocation);
    setIsLocationEmpty(true);
  };

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width={750}
            height={284}
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big" />
          </svg>
          <svg
            className="background-logo__icon"
            width={343}
            height={343}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype" />
          </svg>
        </div>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleFormSubmit}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
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
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">
                          Загрузите фото профиля
                        </h2>
                        <span className="sign-up__text">
                          JPG, PNG, оптимальный размер 100×100&nbsp;px
                        </span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Имя</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="text"
                              name="name"
                              required
                              minLength={LengthParameters.MinLengthName}
                              maxLength={LengthParameters.MaxLengthName}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input type="email" name="email" required />
                          </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">
                            Дата рождения
                          </span>
                          <span className="custom-input__wrapper">
                            <input
                              type="date"
                              name="birthday"
                              max="2099-12-31"
                              required
                            />
                          </span>
                        </label>
                      </div>
                      <div className="custom-select custom-select--not-selected">
                        <span className="custom-select__label">
                          Ваша локация
                        </span>
                        <button
                          className="custom-select__button"
                          type="button"
                          aria-label="Выберите одну из опций"
                          onClick={handleButtonClick}
                        >
                          <span
                            className="custom-select__text"
                            style={{ opacity: 1 }}
                          >
                            {location}
                          </span>
                          <span className="custom-select__icon">
                            <svg width={15} height={6} aria-hidden="true">
                              <use xlinkHref="#arrow-down" />
                            </svg>
                          </span>
                        </button>
                        {!isLocationEmpty && (
                          <p className={registerStyles.location__error}>
                            Выберите ближайшую станцию метро!
                          </p>
                        )}

                        <ul
                          role="listbox"
                          onClick={handleListClick}
                          className={classNames(
                            'custom-select__list',
                            isChangeLocation ? registerStyles.display_list : ''
                          )}
                        >
                          {locationItems}
                        </ul>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="password"
                              name="password"
                              autoComplete="off"
                              required
                              minLength={LengthParameters.MinLengthPassword}
                              maxLength={LengthParameters.MaxLengthPassword}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__radio">
                        <span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                value={'мужской'}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Мужской
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                defaultChecked
                                value={'женский'}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Женский
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                value={'неважно'}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Неважно
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              defaultValue="тренер"
                              defaultChecked
                            />
                            <span className="role-btn__icon">
                              <svg width={12} height={13} aria-hidden="true">
                                <use xlinkHref="#icon-cup" />
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              Я хочу тренировать
                            </span>
                          </label>
                        </div>
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              defaultValue="пользователь"
                            />
                            <span className="role-btn__icon">
                              <svg width={12} height={13} aria-hidden="true">
                                <use xlinkHref="#icon-weight" />
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              Я хочу тренироваться
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          defaultValue="user-agreement"
                          name="user-agreement"
                          defaultChecked
                          onClick={handleUserAgreementOnClick}
                        />
                        <span className="sign-up__checkbox-icon">
                          <svg width={9} height={6} aria-hidden="true">
                            <use xlinkHref="#arrow-check" />
                          </svg>
                        </span>
                        <span className="sign-up__checkbox-label">
                          Я соглашаюсь с{' '}
                          <span>политикой конфиденциальности</span> компании
                        </span>
                      </label>
                    </div>
                    <button
                      className="btn sign-up__button"
                      type="submit"
                      disabled={!isAgreement}
                    >
                      Продолжить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
