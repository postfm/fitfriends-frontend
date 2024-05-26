import Slider from 'react-slick';
import { Training } from '../../../../types';
import { useRef } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { AppRoutes } from '../../../../constants/constants';

interface SpecialForYouSliderProps {
  trainings: Training[];
}

export const SpecialForYouSlider: React.FC<SpecialForYouSliderProps> = ({
  trainings,
}) => {
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
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  trainings =
    trainings.length <= 3
      ? [...trainings, ...trainings, ...trainings]
      : trainings;

  const renderTraining = (training: Training) => (
    <li key={training.training_id} className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img
              src={training.image}
              srcSet={`${training.image}@2x.png 2x`}
              width={452}
              height={191}
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{training.name}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              className="btn btn--small thumbnail-preview__button"
              to={generatePath(AppRoutes.TrainingCard, {
                id: String(training.training_id),
              })}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <section
      className="special-for-you"
      style={trainings.length < 1 ? { display: 'none' } : { display: 'block' }}
    >
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
                onClick={handlePrevious}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
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
            className="special-for-you__list"
            {...settings}
          >
            {trainings.map(renderTraining)}
          </Slider>
        </div>
      </div>
    </section>
  );
};
