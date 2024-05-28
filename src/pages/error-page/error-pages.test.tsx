import { render, screen } from '@testing-library/react';

import ErrorPage from './error-page';

describe('error-page', () => {
  it('should render error page successfullyr', () => {
    render(<ErrorPage />);

    expect(screen.getByText('404 page not found')).toBeInTheDocument();
  });
});
