import { render, screen } from '@testing-library/react';

import MyTrainingsPage from './my-trainings-page';
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

describe('my-trainings-page', () => {
  it('should render my-trainings page successfully for logged in user', () => {
    render(<MyTrainingsPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
