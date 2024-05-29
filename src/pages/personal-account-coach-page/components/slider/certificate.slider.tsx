import React, { ChangeEvent, useRef } from 'react';
import CertificateCard from '../../../../components/certificate-card';
import Slider from 'react-slick';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../../../../api/uploadFile';
import { getURL } from '../../../../utils';
import { User } from '../../../../types';
import { useUser } from '../../../../hooks';

const MIN_AMOUNT_CERTIFICATES = 3;

interface CertificateSliderProps {
  certificates: string;
  onUserSave: (user: User) => void;
}

const CertificateSlider: React.FC<CertificateSliderProps> = ({
  certificates,
  onUserSave,
}) => {
  const user = useUser();
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

  const uploadCertificate = useMutation({
    mutationKey: ['certificate'],
    mutationFn: async (params: { key: string; formData: FormData }) =>
      (await uploadFile(params.key, params.formData)).data,
    onSuccess: (data) => {
      const newUser = {
        ...user,
        certificates: `${user.certificates || ''},${getURL(String(data))}`,
      };
      onUserSave(newUser);
    },
  });

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('certificate', e.target.files[0]);
    formData.append('fileName', e.target.files[0].name);

    uploadCertificate.mutate({ key: 'certificate', formData });
  };

  let certificatesArray = certificates?.split(',') || [];
  certificatesArray =
    certificatesArray.length < MIN_AMOUNT_CERTIFICATES
      ? [...certificatesArray, ...certificatesArray, ...certificatesArray]
      : certificatesArray;

  return (
    <div
      className="personal-account-coach__additional-info"
      data-testid="slider"
    >
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <label className="btn-flat btn-flat--underlined personal-account-coach__button">
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className="visually-hidden"
              type="file"
              accept="*.pdf,*.png, *.jpeg"
              onChange={handleCertificateChange}
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
        {certificatesArray.map((certificate) => (
          <CertificateCard key={certificate} certificate={certificate} />
        ))}
      </Slider>
    </div>
  );
};

export default CertificateSlider;
