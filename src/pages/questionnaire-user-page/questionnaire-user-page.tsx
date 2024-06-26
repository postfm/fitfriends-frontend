import { useRef, useState } from 'react';
import { LengthParameters } from '../../constants/validate.constants';
import { useLocation } from 'react-router-dom';
import { LEVEL_OF_TRAINS, TimeOfTraining } from '../../constants/constants';
import { TypeOfTraining } from '../../components/questionnaire-components';
import { useMutation } from '@tanstack/react-query';
import { NewUser } from '../../types';
import { useAuth } from '../../hooks';
import { register } from '../../api/register';
import { RadioToggleInput } from '../../components/filters';
import { RegistrationData } from '../sign-up-page';
import { toast } from 'react-toastify';
import { postApiResponseError } from '../../utils';

export default function QuestionnaireUserPage(): JSX.Element {
  const form = useRef<HTMLFormElement | null>();
  const location = useLocation();
  const { setCurrentUser } = useAuth();
  const [typeOfTraining, setTypeOfTraining] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>(TimeOfTraining[0]);
  const [levelOfTraining, setLevelOfTraining] = useState<string>(
    LEVEL_OF_TRAINS[0]
  );
  const [caloriesToLose, setCaloriesToLose] = useState<number>(0);
  const [caloriesPerDay, setCaloriesPerDay] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState(false);

  const newUser = useMutation({
    mutationKey: ['register'],
    mutationFn: async (params: { user: NewUser }) =>
      (await register(params.user)).data,
    onSuccess: (data) => {
      toast.success('Пользователь успешно зарегистрирован');
      setCurrentUser(data.user);
    },
    onError: postApiResponseError
  });

  const handleSubmit = () => {
    if (location.state && form.current?.checkValidity()) {
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
        description: undefined,
        location: registrationData.location,
        image: registrationData.image,
        levelOfTrain: levelOfTraining,
        typeOfTraining,
        timeOfTraining: duration,
        caloriesToLose,
        caloriesPerDay,
        readyToTrain: null,
        certificates: null,
        merits: null,
        personalTrainings: null,
      };
      newUser.mutate({ user });
    } else {
      setValidationErrors(true);
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
                <form
                  method="get"
                  onSubmit={(e) => e.preventDefault()}
                  ref={(ref) => (form.current = ref)}
                >
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <TypeOfTraining
                        typeOfTraining={typeOfTraining}
                        setTypeOfTraining={setTypeOfTraining}
                      />
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">
                          Сколько времени вы готовы уделять на тренировку в день
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <RadioToggleInput
                            options={TimeOfTraining.map((key) => ({
                              key,
                              displayValue: key,
                            }))}
                            defaultSelected={TimeOfTraining[0]}
                            onChange={setDuration}
                          />
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">
                          Ваш уровень
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
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
                                  value={caloriesToLose}
                                  onChange={(e) =>
                                    setCaloriesToLose(Number(e.target.value))
                                  }
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
                                  value={caloriesPerDay}
                                  onChange={(e) =>
                                    setCaloriesPerDay(Number(e.target.value))
                                  }
                                  min={LengthParameters.MinCalories}
                                  max={LengthParameters.MaxCalories}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                        {validationErrors && (
                          <p style={{ color: 'red' }}>В форме есть ошибки!</p>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn questionnaire-user__button"
                      type="submit"
                      onClick={handleSubmit}
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
