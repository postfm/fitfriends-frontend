import { render, screen } from '@testing-library/react';

import Select from './select';

describe('select', () => {
  it('should render correctly', () => {
    render(
      <Select
        title="Sample"
        value="123"
        options={[{ value: 'asd', label: 'string' }]}
      />
    );

    expect(screen.getByTestId('select-wrapper')).toHaveTextContent('Sample');
  });
});
