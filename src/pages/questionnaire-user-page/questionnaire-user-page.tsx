import { FormEvent } from 'react';
import { LengthParameters } from '../../constants/validate.constants';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/constants';

export default function QuestionnaireUserPage(): JSX.Element {
  const navigate = useNavigate();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const userDescription = {
      levelOfTrain: formData.get('level'),
      typeOfTraining: formData.getAll('specialization'),
      timeOfTraining: formData.get('time'),
      caloriesToLose: formData.get('calories-lose'),
      caloriesPerDay: formData.get('calories-waste'),
    };

    if (userDescription) {
      navigate(AppRoutes.Main);
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
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={handleFormSubmit}>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">
                          Ваша специализация (тип) тренировок
                        </span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="йога"
                              />
                              <span className="btn-checkbox__btn">Йога</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="бег"
                              />
                              <span className="btn-checkbox__btn">Бег</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="аэробика"
                              />
                              <span className="btn-checkbox__btn">
                                Аэробика
                              </span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="кроссфит"
                                defaultChecked
                              />
                              <span className="btn-checkbox__btn">
                                Кроссфит
                              </span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="бокс"
                                defaultChecked
                              />
                              <span className="btn-checkbox__btn">Бокс</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="пилатес"
                              />
                              <span className="btn-checkbox__btn">Пилатес</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialization"
                                defaultValue="стрейчинг"
                              />
                              <span className="btn-checkbox__btn">
                                Стрейчинг
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">
                          Сколько времени вы готовы уделять на тренировку в день
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="time"
                                value="10-30 мин"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                10-30 мин
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="time"
                                defaultChecked
                                value="30-50 мин"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                30-50 мин
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="time"
                                value="50-80 мин"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                50-80 мин
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="time"
                                value="80-100 мин"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                80-100 мин
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">
                          Ваш уровень
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                                value="Новичок"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Новичок
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                                defaultChecked
                                value="Любитель"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Любитель
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                                value="Профессионал"
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Профессионал
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose">
                          <span className="questionnaire-user__legend">
                            Сколько калорий хотите сбросить
                          </span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calories-lose"
                                  required
                                  min={LengthParameters.MinCalories}
                                  max={LengthParameters.MaxCalories}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="questionnaire-user__calories-waste">
                          <span className="questionnaire-user__legend">
                            Сколько калорий тратить в день
                          </span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calories-waste"
                                  required
                                  min={LengthParameters.MinCalories}
                                  max={LengthParameters.MaxCalories}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn questionnaire-user__button"
                      type="submit"
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
