import { render, screen } from '@testing-library/react';

import LocationMap from './location-map';

describe('location-map', () => {
  it('should render location correctly', () => {
    render(<LocationMap location="Пионерская" />);

    expect(screen.getByTestId('Popup')).toHaveTextContent('Ст.м. Пионерская');
  });
});
