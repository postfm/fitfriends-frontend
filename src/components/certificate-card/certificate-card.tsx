import React, { useState } from 'react';

interface CertificateCardProps {
  certificate: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleButtonClick = () => {
    setIsEdit(!isEdit);
  };
  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image">
          <picture>
            <img
              src={certificate}
              width={294}
              height={360}
              alt="Сертификат - Биомеханика ударов в боксе"
            />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
            type="button"
            onClick={handleButtonClick}
          >
            <svg width={12} height={12} aria-hidden="true">
              <use xlinkHref="#icon-edit" />
            </svg>
            <span>{!isEdit ? 'Изменить' : 'Сохранить'}</span>
          </button>
          {isEdit && (
            <div className="certificate-card__controls">
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
              >
                <label>
                  <input
                    className="visually-hidden"
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                  <svg width={16} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-change" />
                  </svg>
                </label>
              </button>
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
              >
                <svg width={14} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-trash" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CertificateCard;
