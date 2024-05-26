import { render, screen, waitFor } from '@testing-library/react';

import Header from './header';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { NOTIFICATIONS } from '../../mocks/notifications.mocks';
import { loadNotifications } from '../../api/loadNotifications';

jest.mock('../../api/loadNotifications', () => ({
  loadNotifications: jest.fn(() => NOTIFICATIONS),
}));

describe('header', () => {
  it('should render header successfully for logged in user', () => {
    render(<Header />, { wrapper: getMockedRoleProviderWrapper(Role.coach) });

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should load notifications for the current user when rendered', () => {
    render(<Header />, { wrapper: getMockedRoleProviderWrapper(Role.coach) });

    waitFor(() => {
      expect(loadNotifications).toHaveBeenCalledWith(8);
    });
  });

  it('should not render header for not logged in user', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    await waitFor(() =>
      expect(() =>
        render(<Header />, {
          wrapper: getMockedRoleProviderWrapper(),
        })
      ).toThrow()
    );
    jest.restoreAllMocks();
  });
});
