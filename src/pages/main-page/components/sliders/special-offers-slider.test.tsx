import { render, screen } from '@testing-library/react';

import { SpecialOffersSlider } from '.';
import { getMockedRoleProviderWrapper } from '../../../../test-utils/provider-wrapper';
import { Role } from '../../../../types';
import { Training } from '../../../../mocks/training.mocks';

describe('special-offers-slider', () => {
  it('should render component correctly', () => {
    render(<SpecialOffersSlider trainings={[Training]} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
});
