import { render, screen, waitFor } from '@testing-library/react';

import { getMockedRoleProviderWrapper } from '../../../test-utils/provider-wrapper';
import { Role } from '../../../types';
import { NotifyComponent } from './notify-component';
import userEvent from '@testing-library/user-event';
import { deleteNotify } from '../../../api/deleteNotify';

jest.mock('../../../api/deleteNotify');

describe('friend-coach-card', () => {
  it('should render notification successfully', () => {
    render(
      <NotifyComponent
        notify={{
          id: 39,
          text: 'Rob changed the status of your application to принят',
          user: 1,
          createdAt: '2024-05-11T06:54:56.042Z',
        }}
      />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Rob changed the status of your application to принят'
    );
  });

  it('should remove notification successfully on click', () => {
    render(
      <NotifyComponent
        notify={{
          id: 39,
          text: 'Rob changed the status of your application to принят',
          user: 1,
          createdAt: '2024-05-11T06:54:56.042Z',
        }}
      />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    userEvent.click(screen.getByRole('listitem'));

    waitFor(() => {
      expect(deleteNotify).toHaveBeenCalledWith(39);
    });
  });
});
