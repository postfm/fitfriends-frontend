import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LengthParameters } from '../../constants/validate.constants';
import questionnaireStyle from './questionnaire-coach-page.module.css';
import { AppRoutes } from '../../constants/constants';

export default function QuestionnaireCoachPage(): JSX.Element {
  const navigate = useNavigate();
  const [isAmountTraining, setIsAmountTraining] = useState(true);
  const [isMeritsEmpty, setIsMeritsEmpty] = useState(false);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsAmountTraining(true);
    setIsMeritsEmpty(false);

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const coachDescription = {
      levelOfTrain: formData.get('level'),
      typeOfTraining: formData.getAll('specialization'),
      certificates: formData.get('import'),
      merits: formData.get('description'),
      personalTrainings: formData.get('individual-training'),
    };

    if (coachDescription.typeOfTraining.length > LengthParameters.MaxTraining) {
      setIsAmountTraining(false);
      return;
    }

    if (
      (coachDescription.merits?.length as number) === LengthParameters.EmptyText
    ) {
      setIsMeritsEmpty(true);
      return;
    }

    navigate(AppRoutes.MyAccount);
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
        <div className="popup-form popup-form--questionnaire-coach">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={handleFormSubmit}>
                  <div className="questionnaire-coach">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-coach__wrapper">
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваша специализация (тип) тренировок
                        </span>
                        <div className="specialization-checkbox questionnaire-coach__specializations">
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
                          {!isAmountTraining && (
                            <p
                              className={
                                questionnaireStyle.specialization__error
                              }
                            >
                              Количество специализаций не должно превышать 3!
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваш уровень
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                                value={'Новичок'}
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
                                value={'Любитель'}
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
                                value={'Профессионал'}
                              />
                              <span className="custom-toggle-radio__icon" />
                              <span className="custom-toggle-radio__label">
                                Профессионал
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваши дипломы и сертификаты
                        </span>
                        <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              Загрузите сюда файлы формата PDF, JPG или PNG
                              <svg width={20} height={20} aria-hidden="true">
                                <use xlinkHref="#icon-import" />
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".pdf, .jpg, .png"
                              required
                            />
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Расскажите о своём опыте, который мы сможем проверить
                        </span>
                        <div className="custom-textarea questionnaire-coach__textarea">
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                              defaultValue={''}
                              minLength={LengthParameters.MinText}
                              maxLength={LengthParameters.MaxText}
                            />
                          </label>
                          {isMeritsEmpty && (
                            <p className={questionnaireStyle.merits__error}>
                              Это поле не должно быть пустым!
                            </p>
                          )}
                        </div>
                        <div className="questionnaire-coach__checkbox">
                          <label>
                            <input
                              type="checkbox"
                              defaultValue="individual-training"
                              name="individual-training"
                              defaultChecked
                            />
                            <span className="questionnaire-coach__checkbox-icon">
                              <svg width={9} height={6} aria-hidden="true">
                                <use xlinkHref="#arrow-check" />
                              </svg>
                            </span>
                            <span className="questionnaire-coach__checkbox-label">
                              Хочу дополнительно индивидуально тренировать
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn questionnaire-coach__button"
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
