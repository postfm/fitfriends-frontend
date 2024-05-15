import classNames from 'classnames';
import { useUser } from '../../hooks';
import { LengthParameters } from '../../constants/validate.constants';
import {
  Genders,
  LevelOfTraining,
  Locations,
  TypesOfTrainings,
} from '../../constants/constants';
import { useEffect, useState } from 'react';
import accountCoachStyles from './personal-account-page.module.css';
import { User } from '../../types';
import Select from '../select';
import { isEmpty } from 'lodash';

interface UserPersonalInfoCardProps {
  onUserSave: (user: User) => void;
}

const UserPersonalInfoCard: React.FC<UserPersonalInfoCardProps> = ({
  onUserSave,
}) => {
  const user = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [isSpecializationEmpty, setIsSpecializationEmpty] = useState(
    isEmpty(user.typeOfTraining)
  );

  const [avatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [readyToTrain, setReadyToTrain] = useState(user.readyToTrain || false);
  const [typeOfTraining, setTypeOfTraining] = useState(user.typeOfTraining);
  const [location, setLocation] = useState(user.location);
  const [gender, setGender] = useState(user.gender);
  const [levelOfTrain, setLevelOfTrain] = useState(user.levelOfTrain);

  useEffect(() => {
    if (isEditing) {
      setIsSpecializationEmpty(isEmpty(typeOfTraining));
    }
  }, [typeOfTraining, isEditing]);

  const handleSave = () => {
    const newUser = {
      ...user,
      avatar,
      name,
      description,
      readyToTrain,
      typeOfTraining,
      location,
      gender,
      levelOfTrain,
    };

    onUserSave(newUser);
  };

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              readOnly
            />
            <span className="input-load-avatar__avatar">
              <img src={avatar} width={98} height={98} alt="user photo" />
            </span>
          </label>
        </div>
        <div
          className={classNames('user-info-edit__controls hidden', {
            'visually-hidden': !isEditing,
          })}
        >
          <button className="user-info-edit__control-btn" aria-label="обновить">
            <label>
              <input
                className="visually-hidden"
                type="file"
                accept="image/png, image/jpeg"
                readOnly
              />

              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-change" />
              </svg>
            </label>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить">
            <svg width={14} height={16} aria-hidden="true">
              <use xlinkHref="#icon-trash" />
            </svg>
          </button>
        </div>
      </div>
      <form
        className="user-info-edit__form"
        onSubmit={(e) => e.preventDefault()}
      >
        <button
          className="btn-flat btn-flat--underlined user-info-edit__save-button"
          aria-label={!isEditing ? 'Редактировать' : 'Сохранить'}
          onClick={() => {
            if (isEditing && !isSpecializationEmpty) {
              handleSave();
              setIsEditing(false);
            } else if (!isEditing) {
              setIsEditing(true);
            }
          }}
        >
          <svg width={12} height={12} aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span> {!isEditing ? 'Редактировать' : 'Сохранить'}</span>
        </button>
        {isSpecializationEmpty && (
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                checked={readyToTrain}
                onChange={(e) => setReadyToTrain(e.target.checked)}
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
                            typeOfTraining.filter((t) => t !== type)
                          );
                        } else {
                          setTypeOfTraining([...typeOfTraining, type]);
                        }
                      }}
                      checked={typeOfTraining.includes(type)}
                      disabled={!isEditing}
                    />
                    <span className="btn-checkbox__btn">{training}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <Select
          title="Локация"
          value={location}
          options={Locations.map((value) => ({
            value,
            label: `ст. м. ${value}`,
          }))}
          isDisabled={!isEditing}
          onChange={setLocation}
        />
        <Select
          title="Пол"
          value={gender}
          options={Genders.map((value) => ({ value, label: value }))}
          isDisabled={!isEditing}
          onChange={setGender}
        />
        <Select
          title="Уровень"
          value={levelOfTrain}
          options={LevelOfTraining.map((value) => ({ value, label: value }))}
          isDisabled={!isEditing}
          onChange={setLevelOfTrain}
        />
      </form>
    </section>
  );
};

export default UserPersonalInfoCard;
