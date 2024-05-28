import { render, screen } from '@testing-library/react';

import SignUpPage from './sign-up-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';

describe('sign-up-page', () => {
  it('should render sign-up page successfully for logged in user', () => {
    render(<SignUpPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
