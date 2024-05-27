import { render, screen } from '@testing-library/react';

import MainPage from './main-page';
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

describe('main-page', () => {
  it('should render main page successfully for logged in user', () => {
    render(<MainPage />, { wrapper: getMockedRoleProviderWrapper(Role.user) });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
