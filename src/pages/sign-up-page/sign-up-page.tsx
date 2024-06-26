import { ChangeEvent, useRef, useState } from 'react';
import { LengthParameters } from '../../constants/validate.constants';
import {
  AppRoutes,
  GENDERS,
  Locations,
  UserRole,
} from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/select';
import { RadioToggleInput } from '../../components/filters';
import { Role } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../../api/uploadFile';
import { getURL, postApiResponseError } from '../../utils';
import Avatar from '../../components/avatar';

export interface RegistrationData {
  avatar?: string;
  name: string;
  email: string;
  dateOfBirth: string;
  location: string;
  password: string;
  gender: string;
  role: Role;
  isAgreement: boolean;
  image: string;
}

export default function SignUpPage(): JSX.Element {
  const form = useRef<HTMLFormElement | null>();
  const [values, setValues] = useState<RegistrationData>({
    avatar: '',
    name: '',
    email: '',
    dateOfBirth: '',
    location: '',
    password: '',
    gender: '',
    role: Role.coach,
    isAgreement: true,
    image: '/img/content/user-card-photo1.jpg',
  });

  const addAvatar = useMutation({
    mutationKey: ['avatar'],
    mutationFn: async (params: { key: string; formData: FormData }) =>
      (await uploadFile(params.key, params.formData)).data,
    onSuccess: (data) => {
      setValues({ ...values, avatar: getURL(data) });
    },
    onError: postApiResponseError,
  });

  const handleAvatarAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    formData.append('fileName', e.target.files[0].name);

    addAvatar.mutate({ key: 'avatar', formData });
  };

  const getHandler =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [name]: event.target.value });
    };

  const navigate = useNavigate();

  const handleSubmit = (evt: React.FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    form.current?.reportValidity();
    if (form.current?.checkValidity()) {
      navigate(
        values.role === UserRole.coach
          ? AppRoutes.QuestionnaireAccountCoach
          : AppRoutes.QuestionnaireAccountUser,
        { state: { firstStepState: values } }
      );
    }
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
                <form
                  method="get"
                  ref={(ref) => (form.current = ref)}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input
                            className="visually-hidden"
                            name="avatar"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleAvatarAdd}
                          />
                          <span className="input-load-avatar__btn">
                            {values.avatar ? (
                              <Avatar
                                className="input-load-avatar__btn"
                                src={values.avatar}
                              />
                            ) : (
                              <svg width={20} height={20} aria-hidden="true">
                                <use xlinkHref="#icon-import" />
                              </svg>
                            )}
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
                              value={values.name}
                              onChange={getHandler('name')}
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
                            <input
                              type="email"
                              name="email"
                              required
                              value={values.email}
                              onChange={getHandler('email')}
                            />
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
                              value={values.dateOfBirth}
                              onChange={getHandler('dateOfBirth')}
                              max="2099-12-31"
                              required
                            />
                          </span>
                        </label>
                      </div>
                      <div className="custom-select custom-select--not-selected">
                        <Select
                          title="Ваша локация"
                          options={Locations.map((value) => ({
                            value,
                            label: value,
                          }))}
                          value={values.location}
                          required
                          onChange={(value) =>
                            setValues({ ...values, location: value })
                          }
                        />
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
                              value={values.password}
                              onChange={getHandler('password')}
                              minLength={LengthParameters.MinLengthPassword}
                              maxLength={LengthParameters.MaxLengthPassword}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__radio">
                        <RadioToggleInput
                          title="Пол"
                          name="gender"
                          options={GENDERS.map((key) => ({
                            key,
                            displayValue: key,
                          }))}
                          required
                          onChange={(value) =>
                            setValues({ ...values, gender: value })
                          }
                        />
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
                              checked={values.role === Role.coach}
                              onChange={() =>
                                setValues({ ...values, role: Role.coach })
                              }
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
                              checked={values.role === Role.user}
                              onChange={() =>
                                setValues({ ...values, role: Role.user })
                              }
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
                          checked={values.isAgreement}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              isAgreement: e.target.checked,
                            })
                          }
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
                      disabled={!values.isAgreement}
                      onClick={(evt) => handleSubmit(evt)}
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
