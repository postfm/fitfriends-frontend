import { ChangeEvent, useRef, useState } from 'react';
import {
  AuthAppRoutes,
  GENDERS,
  LEVEL_OF_TRAINS,
  TimeOfTraining,
  TypesOfTrainings,
} from '../../constants/constants';
import { LengthParameters } from '../../constants/validate.constants';
import createTrainingStyles from './create-training-page.module.css';
import { generatePath, useNavigate } from 'react-router-dom';
import { NewTraining } from '../../types';
import { createTraining } from '../../api/createTraining';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from '../../components/select';
import { RadioToggleInput } from '../../components/filters';
import { uploadFile } from '../../api/uploadFile';
import { getURL } from '../../utils';

export default function CreateTrainingPage(): JSX.Element {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement | null>();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    name: '',
    image: '/img/content/thumbnails/friend-16.jpg',
    level: '',
    type: '',
    duration: '',
    price: 0,
    calories: 0,
    description: '',
    gender: '',
    video: '',
    rating: 0,
    specialOffer: false,
  });

  const [validationErrors, setValidationErrors] = useState(false);

  const uploadVideo = useMutation({
    mutationKey: ['video'],
    mutationFn: async (params: { key: string; formData: FormData }) =>
      (await uploadFile(params.key, params.formData)).data,
    onSuccess: (data) => {
      setValues({ ...values, video: String(getURL(data)) });
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('video', e.target.files[0]);
    formData.append('fileName', e.target.files[0].name);

    uploadVideo.mutate({ key: 'video', formData });
  };

  const getHandler =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [name]: event.target.value });
    };

  const newTraining = useMutation({
    mutationKey: ['createTraining'],
    mutationFn: async (params: { training: NewTraining }) =>
      await createTraining(params.training),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['trainings'],
      });
      navigate(
        generatePath(AuthAppRoutes.TrainingCard, {
          id: String(data.data.training_id),
        })
      );
    },
  });

  const handleSubmit = () => {
    const training = { ...values };

    if (form.current?.checkValidity()) {
      newTraining.mutate({ training: training });
    } else {
      setValidationErrors(true);
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
                <form
                  method="get"
                  onSubmit={(e) => e.preventDefault()}
                  ref={(ref) => (form.current = ref)}
                >
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
                                value={values.name}
                                onChange={getHandler('name')}
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
                            <Select
                              title="Выберите тип тренировки"
                              options={TypesOfTrainings.map((value) => ({
                                value,
                                label: value,
                              }))}
                              value={values.type}
                              required
                              onChange={(value) =>
                                setValues({ ...values, type: value })
                              }
                            />
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
                                  value={values.calories}
                                  onChange={getHandler('calories')}
                                  min={LengthParameters.MinCalories}
                                  max={LengthParameters.MaxCalories}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <Select
                              title="Сколько времени потратим"
                              options={TimeOfTraining.map((value) => ({
                                value,
                                label: value,
                              }))}
                              value={values.duration}
                              required
                              onChange={(value) =>
                                setValues({ ...values, duration: value })
                              }
                            />
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">
                                Стоимость тренировки
                              </span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="price"
                                  required
                                  value={values.price}
                                  onChange={getHandler('price')}
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <Select
                              title="Выберите уровень тренировки"
                              options={LEVEL_OF_TRAINS.map((value) => ({
                                value,
                                label: value,
                              }))}
                              value={values.level}
                              required
                              onChange={(value) =>
                                setValues({ ...values, level: value })
                              }
                            />
                          </div>
                          <div className="create-training__radio-wrapper">
                            <RadioToggleInput
                              title="Кому подойдет тренировка"
                              options={GENDERS.map((key) => ({
                                key,
                                displayValue: key,
                              }))}
                              onChange={(value) =>
                                setValues({ ...values, gender: value })
                              }
                            />
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
                              value={values.description}
                              onChange={getHandler('description')}
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
                        <div
                          className="drag-and-drop create-training__drag-and-drop"
                          style={{ marginBottom: '1rem' }}
                        >
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
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        {values.video && <video src={values.video} controls />}
                      </div>
                    </div>
                    <button
                      className="btn create-training__button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Опубликовать
                    </button>
                  </div>
                  {validationErrors && (
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
