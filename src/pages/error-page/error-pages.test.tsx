import { render, screen } from '@testing-library/react';

import ErrorPage from './error-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';

describe('error-page', () => {
  it('should render error page successfully for logged in user', () => {
    render(<ErrorPage />, { wrapper: getMockedRoleProviderWrapper() });

    expect(screen.findByText('404 page not found')).toBeInTheDocument();
  });
});
