import React, { useRef } from 'react';
import CertificateCard from '../../../../components/certificate-card';
import Slider from 'react-slick';

interface CertificateSliderProps {
  certificates: string[];
}

const CertificateSlider: React.FC<CertificateSliderProps> = ({
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
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <label className="btn-flat btn-flat--underlined personal-account-coach__button">
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className="visually-hidden"
              type="file"
              accept="image/png, image/jpeg"
            />
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-import" />
            </svg>
            <span style={{ marginLeft: '5px' }}>Загрузить</span>
          </label>
        </label>
        <div className="personal-account-coach__controls">
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
      <Slider
        ref={(slider) => {
          sliderRef.current = slider;
        }}
        className="personal-account-coach__list"
        {...settings}
      >
        {certificates.map((certificate) => (
          <CertificateCard key={certificate} certificate={certificate} />
        ))}
      </Slider>
    </div>
  );
};

export default CertificateSlider;
