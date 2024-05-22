import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioFilter } from './radio-filter';

describe('radio-filter', () => {
  it('should render correct amount of option with minimal required configuration', () => {
    render(<RadioFilter options={['Шаман', 'Волшебник', 'Виноград']} />);

    expect(screen.getAllByRole('radio').length).toBe(3);
    expect(screen.getAllByRole('radio')[0].parentElement).toHaveTextContent(
      'Шаман'
    );
  });

  it('should render with correct title', () => {
    render(
      <RadioFilter title="TITLE" options={['Шаман', 'Волшебник', 'Виноград']} />
    );

    expect(screen.getByRole('heading')).toHaveTextContent('TITLE');
  });

  it('should call the on change callback when option selected', () => {
    const handleChange = jest.fn();
    render(
      <RadioFilter
        options={['Шаман', 'Волшебник', 'Виноград']}
        onChange={handleChange}
      />
    );

    expect(screen.getAllByRole('radio')[0].parentElement).toHaveTextContent(
      'Шаман'
    );

    userEvent.click(screen.getAllByRole('radio')[0]);

    waitFor(() => {
      expect(screen.getAllByRole<HTMLInputElement>('radio')[0]).toBeChecked();
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
