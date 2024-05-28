import { render, screen } from '@testing-library/react';

import UserCardUserPage from './user-card-user-page';
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

describe('user-card-user-page', () => {
  it('should render user-card-user page successfully for logged in user', () => {
    render(<UserCardUserPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
