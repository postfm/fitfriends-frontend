import { render, screen } from '@testing-library/react';
import CreateTrainingPage from './create-training-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { USERS_MOCK } from '../../mocks/users.mocks';

jest.mock('../../api/loadUsers', () => ({
  loadUsers: jest.fn(() => USERS_MOCK),
}));

describe('create-training-page', () => {
  it('should render create-training-page page successfully for logged in user', () => {
    render(<CreateTrainingPage />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
