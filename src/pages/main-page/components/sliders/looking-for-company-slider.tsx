import Slider from 'react-slick';
import { useRef } from 'react';
import { User } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../constants/constants';
import UserCard from '../../../../components/user-card';

interface LookingForCompanySliderProps {
  lookingForCompanyUsers: User[];
}

export const LookingForCompanySlider: React.FC<
  LookingForCompanySliderProps
> = ({ lookingForCompanyUsers }) => {
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
    <section className="look-for-company" data-testid='slider'>
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
              onClick={() => navigate(AppRoutes.UserCatalogue)}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
                onClick={handlePrevious}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
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
            className="look-for-company__list"
            {...settings}
          >
            {lookingForCompanyUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
