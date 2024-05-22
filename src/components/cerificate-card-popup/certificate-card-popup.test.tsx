import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CertificateCardPopup from './certificate-card-popup';

import '../../mocks/test-mocks/intersection-observer.mock';

describe('certificate-card-popup', () => {
  it('should render with non-edit mode by default', () => {
    render(
      <CertificateCardPopup certificate="/img/content/certificates-and-diplomas/certificate-1.jpg" />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Изменить');
  });

  it('should render and enter edit mode on click', () => {
    render(
      <CertificateCardPopup certificate="/img/content/certificates-and-diplomas/certificate-1.jpg" />
    );

    userEvent.click(screen.getByRole('button'));

    waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Сохранить');
    });
  });
});
