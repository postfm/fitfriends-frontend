import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/constants';
import loginStyles from './sign-in-page.module.css';
import { login } from '../../api/login';
import { useAuth } from '../../hooks';
import { useMutation } from '@tanstack/react-query';

export default function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const user = useMutation({
    mutationKey: ['login'],
    mutationFn: async (params: { email: string; password: string }) =>
      (await login(params.email, params.password)).data,
    onSuccess: (data) => {
      authUser(data.currentUser, data.tokens);
      navigate(AppRoutes.Main);
    },
  });

  return (
    <div className="wrapper">
      <main>
        <Helmet>fitfriends:sing-in</Helmet>
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
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form>
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                          />
                        </span>
                      </label>
                      {user.isError && (
                        <p className={loginStyles.password__error}>
                          Такого пользователя не существует!
                        </p>
                      )}
                    </div>

                    <button
                      className="btn sign-in__button"
                      type="submit"
                      onClick={(evt) => {
                        evt.preventDefault();
                        user.mutate({ email, password });
                      }}
                      disabled={user.isPending}
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
