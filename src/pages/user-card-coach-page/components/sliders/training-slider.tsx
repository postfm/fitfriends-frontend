import React, { useEffect, useRef, useState } from 'react';
import { NewPersonalTraining, Training, User } from '../../../../types';
import Slider from 'react-slick';
import TrainingCard from '../../../../components/training-card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { subscribeToCoach } from '../../../../api/subscribeToCoach';
import { loadSubscriptions } from '../../../../api/loadSubscriptions';
import { useUser } from '../../../../hooks';
import { unsubscribeFromCoach } from '../../../../api/unsubscribeFromCoach';
import { addPersonalTraining } from '../../../../api/addPersonalTraining';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../../../constants/constants';

interface TrainingsSliderProps {
  trainings: Training[] | undefined;
  isFriend: boolean;
  coach: User | undefined;
}

const TrainingSlider: React.FC<TrainingsSliderProps> = ({
  trainings,
  isFriend,
  coach,
}) => {
  const { id } = useParams();
  const user = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const subscriptions = useQuery({
    queryKey: ['subscrptions'],
    queryFn: () => loadSubscriptions(Number(id)),
  });

  useEffect(() => {
    if (subscriptions.data) {
      setIsSubscribed(
        subscriptions.data.some(
          (sub) =>
            Number(id) === sub.trainer_id && user.id === sub.subscriber_id
        )
      );
    }
  }, [subscriptions.data, setIsSubscribed, user, id]);

  const subscribeMutation = useMutation({
    mutationKey: ['notificationSubscribe', id],
    mutationFn: (params: { coachId: number }) =>
      subscribeToCoach(params.coachId),
    onSuccess: () => setIsSubscribed(true),
  });

  const unsubscribeMutation = useMutation({
    mutationKey: ['notificationUnsubscribe', id],
    mutationFn: (params: { coachId: number }) =>
      unsubscribeFromCoach(params.coachId),
    onSuccess: () => setIsSubscribed(false),
  });

  const newPersonalTraining = useMutation({
    mutationKey: ['addPersonalTraining', id],
    mutationFn: (params: {
      userId: number;
      personalTraining: NewPersonalTraining;
    }) => addPersonalTraining(params.userId, params.personalTraining),
    onSuccess: () =>
      toast.success('Request for personal training has been submitted'),
  });

  const handleButtonPersonalTrainingClick = () => {
    const value = {
      status: RequestStatus['under consideration'],
    };

    newPersonalTraining.mutate({
      userId: Number(coach?.id),
      personalTraining: value,
    });
  };

  return (
    <div className="user-card-coach__training">
      {trainings && trainings.length > 0 ? (
        <>
          <div className="user-card-coach__training-head">
            <h2 className="user-card-coach__training-title">Тренировки</h2>
            <div className="user-card-coach__training-bts">
              <button
                className="btn-icon user-card-coach__training-btn"
                type="button"
                aria-label="back"
                onClick={handlePrevious}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon user-card-coach__training-btn"
                type="button"
                aria-label="next"
                onClick={handleNext}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            className="user-card-coach__training-list"
            {...settings}
          >
            {trainings?.map((training) => (
              <TrainingCard key={training.training_id} training={training} />
            ))}
          </Slider>
        </>
      ) : null}
      <form className="user-card-coach__training-form">
        {isFriend && coach?.personalTrainings && (
          <button
            className="btn user-card-coach__btn-training"
            type="button"
            onClick={handleButtonPersonalTrainingClick}
          >
            Хочу персональную тренировку
          </button>
        )}
        <div className="user-card-coach__training-check">
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input
                type="checkbox"
                name="user-agreement"
                checked={isSubscribed}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    subscribeMutation.mutate({ coachId: Number(coach?.id) });
                  } else {
                    unsubscribeMutation.mutate({ coachId: Number(coach?.id) });
                  }
                }}
              />
              <span className="custom-toggle__icon">
                <svg width={9} height={6} aria-hidden="true">
                  <use xlinkHref="#arrow-check" />
                </svg>
              </span>
              <span className="custom-toggle__label">
                Получать уведомление на почту о новой тренировке
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TrainingSlider;
