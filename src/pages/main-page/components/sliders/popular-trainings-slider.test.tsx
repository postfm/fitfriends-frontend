import { render, screen } from '@testing-library/react';

import { PopularTrainingsSlider } from '.';
import { getMockedRoleProviderWrapper } from '../../../../test-utils/provider-wrapper';
import { Role } from '../../../../types';
import { Training } from '../../../../mocks/training.mocks';

describe('popular-trainings-slider', () => {
  it('should render component correctly', () => {
    render(<PopularTrainingsSlider trainings={[Training]} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
});
