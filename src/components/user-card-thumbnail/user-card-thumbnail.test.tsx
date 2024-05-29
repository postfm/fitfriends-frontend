import { render, screen } from '@testing-library/react';

import UserCardThumbnail from './user-card-thumbnail';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { USERS_MOCK } from '../../mocks/users.mocks';

describe('user-card-thumbnail', () => {
  it('should render data from user correctly', () => {
    render(<UserCardThumbnail user={USERS_MOCK.data[0]} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('user-card-thumbnail')).toHaveTextContent('Мария');
    expect(screen.getByTestId('user-card-thumbnail')).toHaveTextContent('#пилатес');
    expect(screen.getByTestId('user-card-thumbnail')).toHaveTextContent('#аэробика');
    expect(screen.getByTestId('user-card-thumbnail')).toHaveTextContent('Спортивная');
  });
});
