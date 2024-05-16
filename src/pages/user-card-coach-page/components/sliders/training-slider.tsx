import React, { useRef } from 'react';
import { Training } from '../../../../types';
import Slider from 'react-slick';
import TrainingCard from '../../../../components/training-card';

interface TrainingsSliderProps {
  trainings: Training[] | undefined;
}

const TrainingSlider: React.FC<TrainingsSliderProps> = ({ trainings }) => {
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

  return (
    <div className="user-card-coach__training">
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
          <TrainingCard key={training.trainingId} training={training} />
        ))}
      </Slider>
      <form className="user-card-coach__training-form">
        <button className="btn user-card-coach__btn-training" type="button">
          Хочу персональную тренировку
        </button>
        <div className="user-card-coach__training-check">
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input
                type="checkbox"
                defaultValue="user-agreement-1"
                name="user-agreement"
                defaultChecked
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
