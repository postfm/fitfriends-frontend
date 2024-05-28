import { render, screen } from '@testing-library/react';

import TrainingCardCoachPage from './training-card-coach-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { USERS_MOCK } from '../../mocks/users.mocks';
import { TRAININGS_MOCK } from '../../mocks/trainings.mocks';

jest.mock('../../api/loadUsers', () => ({
  loadUsers: jest.fn(() => USERS_MOCK),
}));

jest.mock('../../api/loadTrainings', () => ({
  loadUsers: jest.fn(() => TRAININGS_MOCK),
}));

describe('training-card-coach-page', () => {
  it('should render training-card-coach page successfully for logged in user', () => {
    render(<TrainingCardCoachPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
