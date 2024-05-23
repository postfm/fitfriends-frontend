import { render, screen } from '@testing-library/react';

import FriendsCoachCard from './friend-coach-card';
import { PERSONAL_TRAININGS } from '../../mocks/personal-training.mock';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { SharaUserFriendMock } from '../../test-utils/user-friend.mock';
import { USERS_MOCK } from '../../mocks/users.mocks';

jest.mock('../../api/updatePersonalTraining', () => ({
  updatePersonalTraining: () => PERSONAL_TRAININGS[0],
}));

describe('friend-coach-card', () => {
  it('should render coach friend card', () => {
    render(
      <FriendsCoachCard
        initiator={SharaUserFriendMock}
        personalTrainings={PERSONAL_TRAININGS}
      />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Shara');
  });

  it('should render coach friend card with pending invite ', () => {
    render(
      <FriendsCoachCard
        initiator={SharaUserFriendMock}
        personalTrainings={[
          {
            initiator: SharaUserFriendMock.id,
            user: USERS_MOCK.data.find((u) => u.email === 'july@trainer.com')
              ?.id as number,
            status: 'на рассмотрении',
          },
        ]}
      />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    expect(screen.getByTestId('ready-to-train-status')).toHaveTextContent(
      'Готов к тренировке'
    );
    expect(screen.getByTestId('invitation-status')).toHaveTextContent(
      'Запрос на персональную тренировку на рассмотрении'
    );
  });

  it('should render with no invitation if initiator not ready to train', () => {
    render(
      <FriendsCoachCard
        initiator={{ ...SharaUserFriendMock, readyToTrain: false }}
        personalTrainings={[
          {
            initiator: SharaUserFriendMock.id,
            user: USERS_MOCK.data.find((u) => u.email === 'july@trainer.com')
              ?.id as number,
            status: 'на рассмотрении',
          },
        ]}
      />,
      { wrapper: getMockedRoleProviderWrapper(Role.coach) }
    );

    expect(screen.getByTestId('ready-to-train-status')).toHaveTextContent(
      'Не готов к тренировке'
    );
  });
});
