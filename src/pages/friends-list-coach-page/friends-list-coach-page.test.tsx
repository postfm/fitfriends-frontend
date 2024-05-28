import { render, screen } from '@testing-library/react';

import FriendsListCoachPage from './friends-list-coach-page';
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

describe('friends-list-coach-page', () => {
  it('should render friends-list-coach-page page successfully for logged in user', () => {
    render(<FriendsListCoachPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
