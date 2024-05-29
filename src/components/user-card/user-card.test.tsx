import { render, screen } from '@testing-library/react';

import UserCard from './user-card';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { USERS_MOCK } from '../../mocks/users.mocks';

describe('user-card', () => {
  it('should render data from user correctly', () => {
    render(<UserCard user={USERS_MOCK.data[0]} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('user-card')).toHaveTextContent('Мария');
    expect(screen.getByTestId('user-card')).toHaveTextContent('#пилатес');
    expect(screen.getByTestId('user-card')).toHaveTextContent('#аэробика');
    expect(screen.getByTestId('user-card')).toHaveTextContent('Спортивная');
  });
});
