import { render, screen } from '@testing-library/react';

import { RangeFilter } from './range-filter';

describe('range-filter', () => {
  it('should render all default elements', () => {
    render(
      <RangeFilter
        title="Уровень"
        max={100}
        min={1}
        defaultMax={20}
        defaultMin={10}
        step={1}
      />
    );

    expect(screen.getAllByRole('spinbutton').length).toBe(2);
    expect(screen.getByRole('heading')).toHaveTextContent('Уровень');
    expect(screen.getAllByRole('slider').length).toBe(2);
  });
});
