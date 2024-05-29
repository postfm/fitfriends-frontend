import { render, screen } from '@testing-library/react';

import TrainingCard from './training-card';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { Training } from '../../mocks/training.mocks';

describe('training-card', () => {
  it('should render data from training correctly', () => {
    render(<TrainingCard training={Training} />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getByTestId('training-card')).toHaveTextContent('CROSSFIT');
    expect(screen.getByTestId('training-card')).toHaveTextContent('#кроссфит');
    expect(screen.getByTestId('training-card')).toHaveTextContent(
      'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.'
    );
  });
});
