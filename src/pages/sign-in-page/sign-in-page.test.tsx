import { render, screen } from '@testing-library/react';

import SignInPage from './sign-in-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';

describe('sign-in-page', () => {
  it('should render sign-in page successfully for logged in user', () => {
    render(<SignInPage />, {
      wrapper: getMockedRoleProviderWrapper(),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
