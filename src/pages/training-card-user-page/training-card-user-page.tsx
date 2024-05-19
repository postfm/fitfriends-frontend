import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewCard from '../../components/review/review-card';
import { AuthAppRoutes } from '../../constants/constants';
import React, { useState } from 'react';
import PopupModal from '../../components/modal/popup-modal';
import { PurchaseForm } from '../../components/popup-forms';
import FeedbackForm from '../../components/popup-forms/feedback-form';
import { loadTraining } from '../../api/loadTraining';
import { renderHashtag, renderPrice } from '../../utils';
import ReactPlayer from 'react-player';
import classNames from 'classnames';

const TrainingCardUserPage: React.FC = () => {
  const [purchasePopupOpen, setPurchasePopupOpen] = useState(false);
  const [feedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
  const [playingPause, setPlayingPause] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const training = useQuery({
    queryKey: ['training', id],
    queryFn: () => loadTraining(Number(id)),
  });

  if (!training.data || training.isLoading) {
    return <div>Loading</div>;
  }

  const handleButtonPlayClick = () => {
    setPlayingPause(!playingPause);
  };

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button
                  className="btn-flat btn-flat--underlined reviews-side-bar__back"
                  type="button"
                  onClick={() => navigate(AuthAppRoutes.Main)}
                >
                  <svg width={14} height={10} aria-hidden="true">
                    <use xlinkHref="#arrow-left" />
                  </svg>
                  <span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {(training.data.reviews || []).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  onClick={() => setFeedbackPopupOpen(true)}
                >
                  Оставить отзыв
                </button>
              </aside>
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img
                            src="/img/content/avatars/coaches//photo-1.png"
                            width={64}
                            height={64}
                            alt="Изображение тренера"
                          />
                        </picture>
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">
                          {training.data.user?.name}
                        </span>
                      </div>
                    </div>
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
                                defaultValue={training.data.name}
                                disabled
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
                                disabled
                                defaultValue={training.data.description}
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
                                defaultValue={training.data.description}
                                disabled
                              />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{renderHashtag(training.data.type)}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(training.data.gender)}
                                </span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(
                                    String(training.data.calories)
                                  )}
                                </span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(training.data.duration)}
                                </span>
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
                                defaultValue={renderPrice(training.data.price)}
                                disabled
                              />
                            </label>
                            <div className="training-info__error">
                              Введите число
                            </div>
                          </div>
                          <button
                            className="btn training-info__buy"
                            type="button"
                            onClick={() => setPurchasePopupOpen(true)}
                          >
                            Купить
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
                      <ReactPlayer
                        url="/img/content/training-video/Big_Buck_Bunny_360_10s_1MB.mp4"
                        controls
                        height="566px"
                        width="922px"
                        playing={playingPause}
                        onPause={() => setPlayingPause(!playingPause)}
                        style={{ borderRadius: '20px' }}
                      />
                      <button
                        className={classNames(
                          'training-video__play-button btn-reset',
                          { 'visually-hidden': playingPause }
                        )}
                        onClick={handleButtonPlayClick}
                      >
                        <svg width={18} height={30} aria-hidden="true">
                          <use xlinkHref="#icon-arrow" />
                        </svg>
                      </button>
                      {/* В перспективе доработать обложку для видео */}
                      {/* <picture>
                        <img
                          src="/img/content/training-video/video-thumbnail.png"
                          width={922}
                          height={566}
                          alt="Обложка видео"
                        />
                      </picture> */}
                    </div>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button
                      className="btn training-video__button training-video__button--start"
                      type="button"
                      onClick={handleButtonPlayClick}
                      disabled
                    >
                      Приступить
                    </button>
                    <button
                      className="btn training-video__button training-video__button--stop"
                      type="button"
                    >
                      Закончить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PopupModal
        isOpen={purchasePopupOpen}
        onClose={() => setPurchasePopupOpen(false)}
        title="Купить тренировку"
      >
        <PurchaseForm
          training={training.data}
          onSave={() => setPurchasePopupOpen(false)}
        />
      </PopupModal>
      <PopupModal
        isOpen={feedbackPopupOpen}
        onClose={() => setFeedbackPopupOpen(false)}
        title="Оставить отзыв"
      >
        <FeedbackForm onSave={() => setFeedbackPopupOpen(false)} />
      </PopupModal>
    </div>
  );
};

export default TrainingCardUserPage;
