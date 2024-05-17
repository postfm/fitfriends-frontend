import React, { useRef } from 'react';
import Slider from 'react-slick';
import CertificateCardPopup from '../../../../components/cerificate-card-popup';

interface CertificateSliderProps {
  certificates: string[];
}

const CertificatePopupSlider: React.FC<CertificateSliderProps> = ({
  certificates,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };
  const settings = {
    center: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div
        className="personal-account-coach__label-wrapper"
        style={{ paddingTop: '30px', paddingRight: '30px' }}
      >
        <h2
          className="personal-account-coach__label"
          style={{ marginRight: '-2px' }}
        >
          Дипломы и сертификаты
        </h2>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          className="personal-account-coach__list"
          {...settings}
        >
          {certificates.map((certificate) => (
            <CertificateCardPopup key={certificate} certificate={certificate} />
          ))}
        </Slider>

        <div
          className="personal-account-coach__controls"
          style={{ alignSelf: 'flex-start' }}
        >
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
            onClick={handlePrevious}
          >
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
          </button>
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="next"
            onClick={handleNext}
          >
            <svg width={16} height={14} aria-hidden="true">
              <use xlinkHref="#arrow-right" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePopupSlider;
