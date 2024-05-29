import { render, screen } from '@testing-library/react';

import { TypeOfTraining } from './type-of-training';
import { noop } from 'lodash';
import { TypesOfTrainings } from '../../constants/constants';

describe('type-of-training', () => {
  it('should render all checkboxes', () => {
    render(
      <TypeOfTraining typeOfTraining={['Бег']} setTypeOfTraining={noop} />
    );

    expect(screen.getAllByRole('checkbox').length).toBe(
      TypesOfTrainings.length
    );
  });
});
