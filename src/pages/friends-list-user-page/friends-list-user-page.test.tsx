import { render, screen } from '@testing-library/react';

import FriendsListUserPage from './friends-list-user-page';
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

describe('friends-list-user-page', () => {
  it('should render main page successfully for logged in user', () => {
    render(<FriendsListUserPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
