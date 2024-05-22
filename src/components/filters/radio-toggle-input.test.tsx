import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioToggleInput } from './radio-toggle-input';

describe('radio-toggle-input', () => {
  it('should render correct amount of option with minimal required configuration', () => {
    render(
      <RadioToggleInput
        options={[
          { key: 'a', displayValue: 'a' },
          { key: 'b', displayValue: 'b' },
        ]}
      />
    );

    expect(screen.getAllByRole('radio').length).toBe(2);
    expect(screen.getAllByRole('radio')[0].parentElement).toHaveTextContent(
      'a'
    );
  });

  it('should call the on change callback when option selected', () => {
    const handleChange = jest.fn();
    render(
      <RadioToggleInput
        options={[
          { key: 'a', displayValue: 'a' },
          { key: 'b', displayValue: 'b' },
        ]}
        onChange={handleChange}
      />
    );

    userEvent.click(screen.getAllByRole('radio')[0]);

    waitFor(() => {
      expect(screen.getAllByRole<HTMLInputElement>('radio')[0]).toBeChecked();
      expect(handleChange).toHaveBeenCalled();
    });

    userEvent.click(screen.getAllByRole('radio')[1]);

    waitFor(() => {
      expect(screen.getAllByRole<HTMLInputElement>('radio')[1]).toBeChecked();
      expect(handleChange).toHaveBeenCalledTimes(2);
    });
  });
});
