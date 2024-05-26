import Slider from 'react-slick';
import { Training } from '../../../../types';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../constants/constants';
import PopularTrainingCard from '../../../../components/popular-training-card';

interface PopularTrainingsSliderProps {
  trainings: Training[];
}

export const PopularTrainingsSlider: React.FC<PopularTrainingsSliderProps> = ({
  trainings,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
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
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={() => navigate(AppRoutes.TrainingCatalogue)}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
                onClick={handlePrevious}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
                onClick={handleNext}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            className="popular-trainings__list"
            {...settings}
          >
            {trainings.map((training) => (
              <PopularTrainingCard
                key={training.training_id}
                training={training}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
