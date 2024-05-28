import { render, screen } from '@testing-library/react';

import UsersCatalogPage from './users-catalog-page';
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

describe('users-catalog-page', () => {
  it('should render users-catalog page successfully for logged in user', () => {
    render(<UsersCatalogPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
