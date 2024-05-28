import { render, screen } from '@testing-library/react';

import QuestionnaireUserPage from './questionnaire-user-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { USERS_MOCK } from '../../mocks/users.mocks';
import { TRAININGS_MOCK } from '../../mocks/trainings.mocks';

jest.mock('../../api/loadUsers', () => ({
  loadUsers: jest.fn(() => USERS_MOCK),
}));

jest.mock('../../api/loadTrainings', () => ({
  loadUsers: jest.fn(() => TRAININGS_MOCK),
}));

describe('questionnaire-user-page', () => {
  it('should render questionnaire-user page successfully for logged in user', () => {
    render(<QuestionnaireUserPage />, {
      wrapper: getMockedRoleProviderWrapper(),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
