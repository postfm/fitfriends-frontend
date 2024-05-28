import { render, screen } from '@testing-library/react';

import PersonalAccountCoach from './personal-account-coach';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { USERS_MOCK } from '../../mocks/users.mocks';
import { TRAININGS_MOCK } from '../../mocks/trainings.mocks';

import '../../mocks/test-mocks/intersection-observer.mock';

jest.mock('../../api/loadUsers', () => ({
  loadUsers: jest.fn(() => USERS_MOCK),
}));

jest.mock('../../api/loadTrainings', () => ({
  loadUsers: jest.fn(() => TRAININGS_MOCK),
}));

describe('personal-account-coach', () => {
  it('should render personal-account-coach page successfully for logged in user', () => {
    render(<PersonalAccountCoach />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
