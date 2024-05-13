import { Link, useParams } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';
import { useState } from 'react';
import { LengthParameters } from '../../constants/validate.constants';
import { useUser } from '../../hooks';
import { loadTrainings } from '../../api/loadTrainings';
import { useQuery } from '@tanstack/react-query';
import { loadReviews } from '../../api/loadReviews';
import ReviewCard from '../../components/review/review-card';

const DISCORD = 0.9;

export default function TrainingCardCoachPage(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [isDiscord, setIsDiscord] = useState(false);
  const currentCoach = useUser();
  const { id } = useParams();
  const trainings = useQuery({
    queryKey: ['trainings'],
    queryFn: loadTrainings,
  });
  const reviews = useQuery({
    queryKey: ['reviews'],
    queryFn: loadReviews,
  });

  const training = trainings.data?.filter(
    (item) => item.trainingId === +(id as string)
  )[0];
  const [price, setPrice] = useState(training?.price as number);

  const handleButtonEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleButtonDiscordClick = () => {
    setIsDiscord(!isDiscord);
    const currentPrice = !isDiscord ? price * DISCORD : price / DISCORD;
    setPrice(currentPrice);
  };

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <Link
                  className="btn-flat btn-flat--underlined reviews-side-bar__back"
                  to={AuthAppRoutes.MyAccount}
                >
                  <svg width={14} height={10} aria-hidden="true">
                    <use xlinkHref="#arrow-left" />
                  </svg>
                  <span>Назад</span>
                </Link>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {reviews.data?.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  disabled
                >
                  Оставить отзыв
                </button>
              </aside>
              <div className="training-card training-card--edit">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img
                            src={`/${currentCoach.avatar}`}
                            width={64}
                            height={64}
                            alt="Изображение тренера"
                          />
                        </picture>
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">
                          {currentCoach.name}
                        </span>
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
                      onClick={handleButtonEditClick}
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
                                defaultValue={training?.name}
                                readOnly={!isEdit}
                                required
                                minLength={LengthParameters.MinLengthName}
                                maxLength={LengthParameters.MaxLengthName}
                              />
                            </label>
                            <div className="training-info__error">
                              Обязательное поле
                            </div>
                          </div>
                          <div className="training-info__textarea">
                            <label>
                              <span className="training-info__label">
                                Описание тренировки
                              </span>
                              <textarea
                                name="description"
                                defaultValue={training?.description}
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
                              <span className="training-info__label">
                                Рейтинг
                              </span>
                              <span className="training-info__rating-icon">
                                <svg width={18} height={18} aria-hidden="true">
                                  <use xlinkHref="#icon-star" />
                                </svg>
                              </span>
                              <input
                                type="number"
                                name="rating"
                                defaultValue={training?.rating}
                                readOnly={false}
                              />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${training?.type as string}`}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${training?.gender as string}`}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${
                                  training?.calories as number
                                }`}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${
                                  training?.duration as string
                                }`}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label>
                              <span className="training-info__label">
                                Стоимость
                              </span>
                              <input
                                type="text"
                                name="price"
                                value={`${price} ₽`}
                                readOnly={!isEdit}
                                required
                              />
                            </label>
                            <div className="training-info__error">
                              Введите число
                            </div>
                          </div>
                          <button
                            className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                            type="button"
                            onClick={handleButtonDiscordClick}
                            disabled={!isEdit}
                          >
                            <svg width={14} height={14} aria-hidden="true">
                              <use xlinkHref="#icon-discount" />
                            </svg>
                            <span>
                              {!isDiscord
                                ? 'Сделать скидку 10%'
                                : 'Отменить скидку'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
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
                  <div className="training-video__drop-files">
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
                        <button className="btn" type="button">
                          Сохранить
                        </button>
                        <button className="btn btn--outlined" type="button">
                          Удалить
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
