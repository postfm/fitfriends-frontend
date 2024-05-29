import { render, screen } from '@testing-library/react';

import { LookingForCompanySlider } from './';
import { getMockedRoleProviderWrapper } from '../../../../test-utils/provider-wrapper';
import { Role } from '../../../../types';
import { USERS_MOCK } from '../../../../mocks/users.mocks';

describe('looking-for-company-slider', () => {
  it('should render component correctly', () => {
    render(
      <LookingForCompanySlider lookingForCompanyUsers={USERS_MOCK.data} />,
      {
        wrapper: getMockedRoleProviderWrapper(Role.user),
      }
    );

    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
});
