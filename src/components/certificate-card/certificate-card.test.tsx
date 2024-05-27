import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import CertificateCard from './certificate-card';

import '../../mocks/test-mocks/intersection-observer.mock';

describe('certificate-card', () => {
  it('should render certificate card with non-edit mode by default', () => {
    render(
      <CertificateCard certificate="/img/content/certificates-and-diplomas/certificate-1.jpg" />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    expect(screen.getByRole('button')).toHaveTextContent('Изменить');
  });

  it('should render certificate card and enter edit mode on click', () => {
    render(
      <CertificateCard certificate="/img/content/certificates-and-diplomas/certificate-1.jpg" />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    userEvent.click(screen.getByRole('button'));

    waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Сохранить');
    });
  });
});
