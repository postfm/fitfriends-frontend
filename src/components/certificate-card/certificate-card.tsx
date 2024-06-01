import React, { ChangeEvent, useState } from 'react';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../../api/uploadFile';
import { getURL } from '../../utils';
import { useUser } from '../../hooks';
import { toast } from 'react-toastify';
import { deleteFile } from '../../api/deleteFile';

interface CertificateCardProps {
  certificate: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const user = useUser();
  const [isEdit, setIsEdit] = useState(false);
  const [certificates, setCertificate] = useState(user.certificates);

  const changeCertificate = useMutation({
    mutationKey: ['certificate'],
    mutationFn: async (params: { key: string; formData: FormData }) =>
      (await uploadFile(params.key, params.formData)).data,
    onSuccess: (data) => {
      setCertificate(String(getURL(data)));
    },
  });

  const deleteCertificate = useMutation({
    mutationKey: ['certificate'],
    mutationFn: async (certificate: string) => await deleteFile(certificate),
    onSuccess: () => {
      toast.success('Certificate deleted successfully');
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

    changeCertificate.mutate({ key: 'certificate', formData });
  };

  const handleFileDelete = () => {
    deleteCertificate.mutate(certificate);
    const certificatesArray = certificates?.split(',') || [];
    certificatesArray.filter(
      (certificateItem) => certificateItem !== getURL(String(certificate))
    );
    setCertificate(certificatesArray.join(','));
  };

  const handleButtonClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@^3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={certificate}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </Worker>
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
                    onChange={handleCertificateChange}
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
                onClick={handleFileDelete}
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
