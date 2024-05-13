import Slider from 'react-slick';
import { Training } from '../../../../types';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import { renderPrice } from '../../../../utils';

interface SpecialOffersSliderProps {
  trainings: Training[];
}

export const SpecialOffersSlider: React.FC<SpecialOffersSliderProps> = ({
  trainings,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);
  const goTo = (index: number) => {
    setCurrentIndex(index);
    sliderRef.current?.slickGoTo(index);
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const renderButtons = () => (
    <div className="promo-slider__slider-dots">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          className={classNames(
            {
              'promo-slider__slider-dot--active': currentIndex === index,
            },
            'promo-slider__slider-dot'
          )}
          aria-label="первый слайд"
          onClick={() => goTo(index)}
        />
      ))}
    </div>
  );

  const renderTraining = (training: Training) => (
    <li key={training.trainingId} className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay" />
        <div className="promo-slider__image">
          <img
            src={training.image}
            srcSet={`${training.image}@2x.png 2x`}
            width={1040}
            height={469}
            alt="promo-photo"
          />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{training.name}</h3>
          <div className="promo-slider__logo">
            <svg width={74} height={74} aria-hidden="true">
              <use xlinkHref="#logotype" />
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">
          {`${training.type} - горячие предложения`}
        </span>
        <div className="promo-slider__bottom-container">
          {renderButtons()}
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">
              ${renderPrice(training.price, training.specialOffer)}
            </p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">
              ${renderPrice(training.price)}
            </p>
          </div>
        </div>
      </aside>
    </li>
  );

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          {trainings.length > 0 && (
            <Slider
              ref={(slider) => {
                sliderRef.current = slider;
              }}
              className="special-offers__list"
              {...settings}
            >
              {trainings.slice(0, 3).map(renderTraining)}
            </Slider>
          )}
          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/nearest-gym-01.jpg"
                  srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                  width={330}
                  height={190}
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-spec-gym__type">Ближайший зал</p>
            <div
              className="thumbnail-spec-gym__header"
              style={{ alignContent: 'center' }}
            >
              <h3 className="thumbnail-spec-gym__title">
                Скоро здесь появится что - то полезное
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
