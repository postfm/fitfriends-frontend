import classNames from 'classnames';
import { useUser } from '../../hooks';
import { LengthParameters } from '../../constants/validate.constants';
import {
  GENDERS,
  LEVEL_OF_TRAINS,
  Locations,
  TypesOfTrainings,
} from '../../constants/constants';
import { ChangeEvent, useState } from 'react';
import { User } from '../../types';
import Select from '../select';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../../api/uploadFile';
import { deleteFile } from '../../api/deleteFile';
import { getURL, postApiResponseError } from '../../utils';
import { toast } from 'react-toastify';
import Avatar from '../avatar';

interface UserPersonalInfoCardProps {
  onUserSave: (user: User) => void;
}

const UserPersonalInfoCard: React.FC<UserPersonalInfoCardProps> = ({
  onUserSave,
}) => {
  const user = useUser();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [readyToTrain, setReadyToTrain] = useState(user.readyToTrain || false);
  const [typeOfTraining, setTypeOfTraining] = useState(user.typeOfTraining);
  const [location, setLocation] = useState(user.location);
  const [gender, setGender] = useState(user.gender);
  const [levelOfTrain, setLevelOfTrain] = useState(user.levelOfTrain);
  const [avatar, setAvatar] = useState(user.avatar);

  const changeAvatar = useMutation({
    mutationKey: ['avatar'],
    mutationFn: async (params: { key: string; formData: FormData }) =>
      (await uploadFile(params.key, params.formData)).data,
    onSuccess: (data) => {
      setAvatar(String(getURL(data)));
    },
    onError: postApiResponseError,
  });

  const deleteAvatar = useMutation({
    mutationKey: ['avatar'],
    mutationFn: async (avatar: string) => await deleteFile(avatar),
    onSuccess: (data) => {
      setAvatar(String(data));
      toast.success('Avatar deleted successfully');
    },
    onError: postApiResponseError,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    formData.append('fileName', e.target.files[0].name);

    changeAvatar.mutate({ key: 'avatar', formData });
  };

  const handleFileDelete = () => {
    deleteAvatar.mutate(avatar);
  };

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
    <section className="user-info-edit" data-testid="user-personal-info-card">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              readOnly
              disabled
            />
            <span className="input-load-avatar__avatar">
              <Avatar src={avatar} width={98} height={98} />
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
                name="avatar"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                readOnly
              />

              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-change" />
              </svg>
            </label>
          </button>
          <button
            className="user-info-edit__control-btn"
            aria-label="удалить"
            onClick={handleFileDelete}
          >
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
            if (isEditing) {
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
              <span className="custom-toggle__label">Готов к тренировкам</span>
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
          options={GENDERS.map((value) => ({ value, label: value }))}
          isDisabled={!isEditing}
          onChange={setGender}
        />
        <Select
          title="Уровень"
          value={levelOfTrain}
          options={LEVEL_OF_TRAINS.map((value) => ({ value, label: value }))}
          isDisabled={!isEditing}
          onChange={setLevelOfTrain}
        />
      </form>
    </section>
  );
};

export default UserPersonalInfoCard;
