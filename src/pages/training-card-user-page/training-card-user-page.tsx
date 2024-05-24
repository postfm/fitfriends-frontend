import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { OrderAmountTraining, Training } from '../../types';
import { loadMyOrders } from '../../api/loadMyOrders';
import { updateOrder } from '../../api/updateOrder';
import { loadReviews } from '../../api/loadReviews';

const AMOUNT_DECREMENT = -1;

const TrainingCardUserPage: React.FC = () => {
  const [purchasePopupOpen, setPurchasePopupOpen] = useState(false);
  const [feedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
  const [playingPause, setPlayingPause] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const training = useQuery({
    queryKey: ['training', id],
    queryFn: async () => (await loadTraining(Number(id))).data,
  });

  const orders = useQuery({
    queryKey: ['puchases'],
    queryFn: async () => (await loadMyOrders()).data,
  });

  const reviews = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => (await loadReviews(Number(id))).data,
  });

  const myOrder = orders.data?.filter(
    (order) => order.training.training_id === Number(id)
  )[0];

  const newAmount = useMutation({
    mutationKey: ['amountTraining'],
    mutationFn: async (params: {
      id: number;
      newAmount: OrderAmountTraining;
    }) => await updateOrder(params.id, params.newAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['puchases'],
      });
    },
  });

  const handleButtonStartClick = () => {
    const value = {
      amount: Number(myOrder?.amount) + AMOUNT_DECREMENT,
    };
    setIsTraining(true);
    newAmount.mutate({
      id: Number(myOrder?.id),
      newAmount: value,
    });
  };

  const handleButtonFinishClic = () => {
    setIsTraining(false);
    setPlayingPause(false);
  };

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
                  {(reviews.data || []).map((review) => (
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
                          {training.data?.user?.name}
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
                                defaultValue={training.data?.name}
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
                                defaultValue={training.data?.description}
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
                                defaultValue={training.data?.rating}
                                disabled
                              />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(String(training.data?.type))}
                                </span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(String(training.data?.gender))}
                                </span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(
                                    String(training.data?.calories)
                                  )}
                                </span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {renderHashtag(
                                    String(training.data?.duration)
                                  )}
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
                                value={renderPrice(
                                  Number(training.data?.price)
                                )}
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
                            disabled={Number(myOrder?.amount) > 0}
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
                      />
                      <button
                        className={classNames(
                          'training-video__play-button btn-reset',
                          { 'visually-hidden': playingPause }
                        )}
                        onClick={handleButtonPlayClick}
                        disabled={!isTraining}
                      >
                        <svg width={18} height={30} aria-hidden="true">
                          <use xlinkHref="#icon-arrow" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button
                      className={classNames(
                        'btn training-video__button training-video__button--start',
                        { 'visually-hidden': isTraining }
                      )}
                      type="button"
                      onClick={handleButtonStartClick}
                      disabled={Number(myOrder?.amount) < 1}
                    >
                      Приступить
                    </button>
                    <button
                      className="btn training-video__button training-video__button--stop"
                      type="button"
                      style={
                        isTraining ? { display: 'block' } : { display: 'none' }
                      }
                      onClick={handleButtonFinishClic}
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
          orderId={Number(myOrder?.id)}
          training={myOrder?.training as Training}
          onSave={() => setPurchasePopupOpen(false)}
        />
      </PopupModal>
      <PopupModal
        isOpen={feedbackPopupOpen}
        onClose={() => setFeedbackPopupOpen(false)}
        title="Оставить отзыв"
      >
        <FeedbackForm
          trainingId={Number(training.data?.training_id)}
          onSave={() => setFeedbackPopupOpen(false)}
        />
      </PopupModal>
    </div>
  );
};

export default TrainingCardUserPage;
