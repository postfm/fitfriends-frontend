import { useState } from 'react';
import { Training } from '../../../types';
import { LengthParameters } from '../../../constants/validate.constants';
import { PRICE_WITH_DISCOUNT } from '../../../constants/constants';
import { renderPrice } from '../../../utils';
import classNames from 'classnames';

interface TrainingInfoCardProps {
  training: Training;
  onSave: (training: Training) => void;
}

const TrainingInfoCard: React.FC<TrainingInfoCardProps> = ({
  training,
  onSave,
}) => {
  const [isDeleteVideo, setIsDeleteVideo] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(training.name);
  const [price, setPrice] = useState(training.price);
  const [description, setDescription] = useState(training.description);
  const [isSpecialOffer, setIsSpecialOffer] = useState(training.specialOffer);
  const [rating, setRating] = useState(training.rating);

  const handleEditSaveButton = () => {
    if (isEdit) {
      onSave({
        ...training,
        name,
        price,
        description,
        specialOffer: isSpecialOffer,
        rating,
      });
    }
    setIsEdit(!isEdit);
  };

  const handleDiscountButton = () => {
    setIsSpecialOffer(!isSpecialOffer);
    setPrice(
      Math.round(
        !isSpecialOffer
          ? price * PRICE_WITH_DISCOUNT
          : price / PRICE_WITH_DISCOUNT
      )
    );
  };

  const handleButtonDeleteVideoClick = () => {
    setIsDeleteVideo(true);
  };

  const handleButtonSaveVideoClick = () => {
    setIsDeleteVideo(false);
  };

  return (
    <div className="training-card training-card--edit">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img
                  src={training.user.avatar}
                  width={64}
                  height={64}
                  alt="Изображение тренера"
                />
              </picture>
            </div>
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{training.user.name}</span>
            </div>
          </div>
          <button
            className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
            type="button"
          >
            <svg width={12} height={12} aria-hidden="true">
              <use xlinkHref="#icon-edit" />
            </svg>
            <span>Редактировать</span>
          </button>
          <button
            className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
            type="button"
            onClick={handleEditSaveButton}
          >
            <svg width={12} height={12} aria-hidden="true">
              <use xlinkHref="#icon-edit" />
            </svg>
            <span>{!isEdit ? 'Редактировать' : 'Сохранить'}</span>
          </button>
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      Название тренировки
                    </span>
                    <input
                      type="text"
                      name="training"
                      readOnly={!isEdit}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      minLength={LengthParameters.MinLengthName}
                      maxLength={LengthParameters.MaxLengthName}
                    />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      readOnly={!isEdit}
                      required
                      minLength={LengthParameters.MinText}
                      maxLength={LengthParameters.MaxText}
                    />
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width={18} height={18} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      defaultValue={training.rating}
                      readOnly={false}
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    />
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>{`#${training.type}`}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>{`#${training.gender}`}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>{`#${training.calories}`}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>{`#${training.duration}`}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <input
                      type={isEdit ? 'number' : 'text'}
                      name="price"
                      value={isEdit ? price : renderPrice(price)}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      readOnly={!isEdit}
                      required
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <button
                  className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                  type="button"
                  onClick={handleDiscountButton}
                  disabled={!isEdit}
                >
                  <svg width={14} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-discount" />
                  </svg>
                  <span>
                    {!isSpecialOffer ? 'Сделать скидку 10%' : 'Отменить скидку'}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div
          className={classNames('training-video__video', {
            'visually-hidden': isDeleteVideo,
          })}
        >
          <div className="training-video__thumbnail">
            <picture>
              <img
                src="/img/content/training-video/video-thumbnail.png"
                width={922}
                height={566}
                alt="Обложка видео"
              />
            </picture>
          </div>
          <button className="training-video__play-button btn-reset">
            <svg width={18} height={30} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
        <div
          className="training-video__drop-files"
          style={isDeleteVideo ? { display: 'contents' } : { display: 'none' }}
        >
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
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
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        {isEdit && (
          <div className="training-video__buttons-wrapper">
            <button
              className="btn training-video__button training-video__button--start"
              type="button"
              disabled
            >
              Приступить
            </button>
            <div className="training-video__edit-buttons">
              <button
                className="btn"
                type="button"
                onClick={handleButtonSaveVideoClick}
              >
                Сохранить
              </button>
              <button
                className="btn btn--outlined"
                type="button"
                onClick={handleButtonDeleteVideoClick}
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingInfoCard;
