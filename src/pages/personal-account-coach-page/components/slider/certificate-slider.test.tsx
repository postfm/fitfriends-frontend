import { render, screen } from '@testing-library/react';

import CertificateSlider from '.';
import { getMockedRoleProviderWrapper } from '../../../../test-utils/provider-wrapper';
import { Role } from '../../../../types';
import { noop } from 'lodash';

import '../../../../mocks/test-mocks/intersection-observer.mock';

describe('certificate-slider', () => {
  it('should render component correctly', () => {
    render(
      <CertificateSlider certificates="one,two,three" onUserSave={noop} />,
      {
        wrapper: getMockedRoleProviderWrapper(Role.user),
      }
    );

    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
  it('should render correct heading', () => {
    render(
      <CertificateSlider certificates="one,two,three" onUserSave={noop} />,
      {
        wrapper: getMockedRoleProviderWrapper(Role.user),
      }
    );

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Дипломы и сертификаты'
    );
  });
});
