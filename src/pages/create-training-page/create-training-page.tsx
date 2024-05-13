import { FormEvent, useState } from 'react';
import {
  AuthAppRoutes,
  LevelOfTraining,
  TimeOfTraining,
  TypesOfTrainings,
} from '../../constants/constants';
import { LengthParameters } from '../../constants/validate.constants';
import createTrainingStyles from './create-training-page.module.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export default function CreateTrainingPage(): JSX.Element {
  const [typeTraining, setTypeTraining] = useState('');
  const [timeTraining, setTimeTraining] = useState('');
  const [levelTraining, setLevelTraining] = useState('');
  const [isTypeChange, setTypeChange] = useState(false);
  const [isTimeChange, setTimeChange] = useState(false);
  const [isLevelChange, setLevelChange] = useState(false);
  const [inputDataError, setInputDataError] = useState(true);
  const navigate = useNavigate();

  const handleTypeButtonClick = () => {
    setTypeChange(!isTypeChange);
  };

  const handleTimeButtonClick = () => {
    setTimeChange(!isTimeChange);
  };

  const handleLevelButtonClick = () => {
    setLevelChange(!isLevelChange);
  };

  const handleTypeListClick: React.MouseEventHandler<HTMLElement> = (evt) => {
    setTypeTraining((evt.target as HTMLElement).innerText);
    setTypeChange(!isTypeChange);
  };

  const handleTimeListClick: React.MouseEventHandler<HTMLElement> = (evt) => {
    setTimeTraining((evt.target as HTMLElement).innerText);
    setTimeChange(!isTimeChange);
  };

  const handleLevelListClick: React.MouseEventHandler<HTMLElement> = (evt) => {
    setLevelTraining((evt.target as HTMLElement).innerText);
    setLevelChange(!isLevelChange);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setInputDataError(true);

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!typeTraining || !timeTraining || !levelTraining) {
      setInputDataError(false);
      return;
    }

    const newTraining = {
      name: formData.get('training-name'),
      type: typeTraining,
      time: timeTraining,
      level: levelTraining,
      price: formData.get('price'),
      calories: formData.get('calories'),
      description: formData.get('description'),
      gender: formData.get('gender'),
      video: formData.get('import'),
    };

    if (newTraining) {
      navigate(AuthAppRoutes.MyTrainings);
    }
  };
  return (
    <div className="wrapper">
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleFormSubmit}>
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Название тренировки
                        </h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name="training-name"
                                required
                                minLength={LengthParameters.MinLengthName}
                                maxLength={LengthParameters.MaxLengthName}
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Характеристики тренировки
                        </h2>
                        <div className="create-training__info">
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">
                              Выберите тип тренировки
                            </span>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={handleTypeButtonClick}
                            >
                              <span
                                className="custom-select__text"
                                style={{ opacity: 1 }}
                              >
                                {typeTraining}
                              </span>
                              <span className="custom-select__icon">
                                <svg width={15} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-down" />
                                </svg>
                              </span>
                            </button>
                            <ul
                              className={classNames(
                                'custom-select__list',
                                isTypeChange
                                  ? createTrainingStyles.display_list
                                  : ''
                              )}
                              role="listbox"
                              onClick={handleTypeListClick}
                            >
                              {TypesOfTrainings.map((typeOfTraining) => (
                                <li key={typeOfTraining}>{typeOfTraining}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">
                                Сколько калорий потратим
                              </span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calories"
                                  required
                                  min={LengthParameters.MinCalories}
                                  max={LengthParameters.MaxCalories}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">
                              Сколько времени потратим
                            </span>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={handleTimeButtonClick}
                            >
                              <span
                                className="custom-select__text"
                                style={{ opacity: 1 }}
                              >
                                {timeTraining}
                              </span>
                              <span className="custom-select__icon">
                                <svg width={15} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-down" />
                                </svg>
                              </span>
                            </button>
                            <ul
                              className={classNames(
                                'custom-select__list',
                                isTimeChange
                                  ? createTrainingStyles.display_list
                                  : ''
                              )}
                              role="listbox"
                              onClick={handleTimeListClick}
                            >
                              {TimeOfTraining.map((time) => (
                                <li key={time}>{time}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">
                                Стоимость тренировки
                              </span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="price" required />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">
                              Выберите уровень тренировки
                            </span>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={handleLevelButtonClick}
                            >
                              <span
                                className="custom-select__text"
                                style={{ opacity: 1 }}
                              >
                                {levelTraining}
                              </span>
                              <span className="custom-select__icon">
                                <svg width={15} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-down" />
                                </svg>
                              </span>
                            </button>
                            <ul
                              className={classNames(
                                'custom-select__list',
                                isLevelChange
                                  ? createTrainingStyles.display_list
                                  : ''
                              )}
                              role="listbox"
                              onClick={handleLevelListClick}
                            >
                              {LevelOfTraining.map((level) => (
                                <li key={level}>{level}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">
                              Кому подойдет тренировка
                            </span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={'для мужчин'}
                                  />
                                  <span className="custom-toggle-radio__icon" />
                                  <span className="custom-toggle-radio__label">
                                    Мужчинам
                                  </span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    defaultChecked
                                    value={'для женщин'}
                                  />
                                  <span className="custom-toggle-radio__icon" />
                                  <span className="custom-toggle-radio__label">
                                    Женщинам
                                  </span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={'для всех'}
                                  />
                                  <span className="custom-toggle-radio__icon" />
                                  <span className="custom-toggle-radio__label">
                                    Всем
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Описание тренировки
                        </h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                              defaultValue={''}
                              required
                              minLength={LengthParameters.MinText}
                              maxLength={LengthParameters.MaxText}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Загрузите видео-тренировку
                        </h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width={20} height={20} aria-hidden="true">
                                <use xlinkHref="#icon-import-video" />
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".mov, .avi, .mp4"
                              required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn create-training__button"
                      type="submit"
                    >
                      Опубликовать
                    </button>
                  </div>
                  {!inputDataError && (
                    <p className={createTrainingStyles.input__error}>
                      Все поля формы обязательны для заполнения!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
