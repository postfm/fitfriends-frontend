import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LengthParameters } from '../../constants/validate.constants';
import questionnaireStyle from './questionnaire-coach-page.module.css';
import { LEVEL_OF_TRAINS, TypesOfTrainings } from '../../constants/constants';
import { RadioToggleInput } from '../../components/filters';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../api/register';
import { NewUser } from '../../types';
import { RegistrationData } from '../sign-up-page/sign-up-page';
import { useAuth } from '../../hooks';
import { uploadFile } from '../../api/uploadFile';
import { getURL, postApiResponseError } from '../../utils';
import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import { isEmpty } from 'lodash';
import questionnaireCoachStyles from './questionnaire-coach-page.module.css';

export default function QuestionnaireCoachPage(): JSX.Element {
  const location = useLocation();
  const { setCurrentUser } = useAuth();
  const [typeOfTraining, setTypeOfTraining] = useState<string[]>([]);
  const [levelOfTraining, setLevelOfTraining] = useState<string>(
    LEVEL_OF_TRAINS[0]
  );
  const [description, setDescription] = useState<string>('');
  const [isWantInvididuallyTrain, setIsWantIndividuallyTrain] =
    useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const [certificate, setCertificates] = useState<string | null>(null);
  useState<boolean>(true);

  const addCertificate = useMutation({
    mutationKey: ['certificate'],
    mutationFn: async (params: { key: string; formData: FormData }) =>
      (await uploadFile(params.key, params.formData)).data,
    onSuccess: (data) => {
      setCertificates(getURL(data));
    },
    onError: postApiResponseError,
  });

  const newUser = useMutation({
    mutationKey: ['register'],
    mutationFn: async (params: { user: NewUser }) =>
      (await register(params.user)).data,
    onSuccess: (data) => {
      setCurrentUser(data.user);
    },
    onError: postApiResponseError,
  });

  const handleSubmit = () => {
    if (description && levelOfTraining && location.state) {
      const registrationData = (
        location.state as { firstStepState: RegistrationData }
      ).firstStepState;

      const user: NewUser = {
        name: registrationData.name,
        email: registrationData.email,
        avatar: registrationData.avatar || registrationData.image,
        password: registrationData.password,
        gender: registrationData.gender,
        birthday: registrationData.dateOfBirth,
        roles: registrationData.role,
        description,
        location: registrationData.location,
        image: registrationData.image,
        levelOfTrain: levelOfTraining,
        typeOfTraining,
        timeOfTraining: null,
        caloriesToLose: null,
        caloriesPerDay: null,
        readyToTrain: null,
        certificates: certificate,
        merits: null,
        personalTrainings: isWantInvididuallyTrain,
      };
      newUser.mutate({ user });
    } else {
      setValidationErrors(true);
    }
  };

  const isCertificatePdf = certificate?.split('.').at(-1) === 'pdf';

  const handleFileAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('certificate', e.target.files[0]);
    formData.append('fileName', e.target.files[0].name);

    addCertificate.mutate({ key: 'certificate', formData });
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
                <form method="get" onSubmit={(e) => e.preventDefault()}>
                  <div className="questionnaire-coach">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-coach__wrapper">
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваша специализация (тип) тренировок
                        </span>
                        <div className="specialization-checkbox questionnaire-coach__specializations">
                          {TypesOfTrainings.map((training) => {
                            const type = training.toLowerCase();
                            return (
                              <div className="btn-checkbox" key={type}>
                                <label>
                                  <input
                                    className="visually-hidden"
                                    type="checkbox"
                                    name="specialization"
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setTypeOfTraining(
                                          typeOfTraining.filter(
                                            (t) => t !== type
                                          )
                                        );
                                      } else {
                                        setTypeOfTraining([
                                          ...typeOfTraining,
                                          type,
                                        ]);
                                      }
                                    }}
                                    checked={typeOfTraining.includes(type)}
                                  />
                                  <span className="btn-checkbox__btn">
                                    {training}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваш уровень
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                          <RadioToggleInput
                            options={LEVEL_OF_TRAINS.map((key) => ({
                              key,
                              displayValue: key,
                            }))}
                            defaultSelected={LEVEL_OF_TRAINS[0]}
                            onChange={setLevelOfTraining}
                          />
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваши дипломы и сертификаты
                        </span>
                        <div
                          className="drag-and-drop questionnaire-coach__drag-and-drop"
                          style={{ marginBottom: '1rem' }}
                        >
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
                              onChange={handleFileAdd}
                            />
                          </label>
                        </div>
                        {certificate &&
                          (isCertificatePdf ? (
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@^3.4.120/build/pdf.worker.min.js">
                              <Viewer
                                fileUrl={certificate}
                                defaultScale={SpecialZoomLevel.PageFit}
                              />
                            </Worker>
                          ) : (
                            <img src={certificate} />
                          ))}
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
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              minLength={LengthParameters.MinText}
                              maxLength={LengthParameters.MaxText}
                            />
                          </label>
                          {validationErrors && !description && (
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
                              checked={isWantInvididuallyTrain}
                              onChange={(e) =>
                                setIsWantIndividuallyTrain(e.target.checked)
                              }
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
                          {validationErrors && (
                            <p className={questionnaireStyle.merits__error}>
                              В форме есть ошибки!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn questionnaire-coach__button"
                      type="submit"
                      onClick={() => {
                        if (!isEmpty(typeOfTraining)) {
                          handleSubmit();
                        }
                      }}
                    >
                      Продолжить
                    </button>
                    {isEmpty(typeOfTraining) && (
                      <p
                        className={
                          questionnaireCoachStyles.specialization__error
                        }
                      >
                        Выберите хотя бы одну специализацию!
                      </p>
                    )}
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
