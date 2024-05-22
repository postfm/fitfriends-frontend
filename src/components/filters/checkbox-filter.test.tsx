import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxFilter } from './checkbox-filter';

describe('checkbox-filter', () => {
  it('should render correct amount of options and correc title with minimal required configuration', () => {
    render(
      <CheckboxFilter
        title="Boss"
        options={[
          { displayValue: 'Bob', key: 'bob' },
          { displayValue: 'John', key: 'john' },
        ]}
      />
    );

    expect(screen.getByText('Boss')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox').length).toBe(2);
    expect(screen.getAllByRole('checkbox')[0].parentElement).toHaveTextContent(
      'Bob'
    );
  });

  it('should render show more button when amount of elemnts greater than 5', () => {
    render(
      <CheckboxFilter
        title="Boss"
        options={[
          { displayValue: 'Bob', key: 'bob' },
          { displayValue: 'John', key: 'john' },
          { displayValue: 'Kyle', key: 'kyle' },
          { displayValue: 'Josh', key: 'josh' },
          { displayValue: 'Crou', key: 'crou' },
          { displayValue: 'Jack', key: 'jack' },
        ]}
        showMoreButton
      />
    );

    expect(screen.getAllByRole('checkbox').length).toBe(5);
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    waitFor(() => {
      expect(screen.getAllByRole('checkbox').length).toBe(6);
    });
  });
});
