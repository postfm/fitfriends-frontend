import { render, screen } from '@testing-library/react';

import { SpecialForYouSlider } from '.';
import { getMockedRoleProviderWrapper } from '../../../../test-utils/provider-wrapper';
import { Role } from '../../../../types';
import { Training } from '../../../../mocks/training.mocks';

describe('special-for-you-slider', () => {
  it('should render component correctly', () => {
    render(<SpecialForYouSlider trainings={[Training]} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });
});
