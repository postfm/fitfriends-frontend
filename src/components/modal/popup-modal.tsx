import classNames from 'classnames';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | undefined;
  subtitle?: string;
  children: React.ReactNode;
}

const PopupModal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  title,
  subtitle,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      preventScroll
      onRequestClose={onClose}
      style={{
        overlay: { background: 'rgba(24, 24, 24, 0.9)', border: 'none' },
        content: {
          border: 'none',
          background: 'rgba(24, 24, 24, 0.9)',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          borderRadius: '60px',
        },
      }}
    >
      <div className="popup__wrapper">
        <div
          className={classNames('popup-head', {
            'popup-head--address': Boolean(subtitle),
          })}
        >
          <h2 className="popup-head__header">{title}</h2>
          {Boolean(subtitle) && (
            <p className="popup-head__address">
              <svg
                className="popup-head__icon-location"
                width={12}
                height={14}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-location" />
              </svg>
              <span>{subtitle}</span>
            </p>
          )}
          <button
            className="btn-icon btn-icon--outlined btn-icon--big"
            type="button"
            aria-label="close"
            onClick={onClose}
          >
            <svg width={20} height={20} aria-hidden="true">
              <use xlinkHref="#icon-cross" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
export default PopupModal;
