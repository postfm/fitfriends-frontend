import { render, screen } from '@testing-library/react';

import QuestionnaireCoachPage from './questionnaire-coach-page';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { USERS_MOCK } from '../../mocks/users.mocks';
import { TRAININGS_MOCK } from '../../mocks/trainings.mocks';

jest.mock('../../api/loadUsers', () => ({
  loadUsers: jest.fn(() => USERS_MOCK),
}));

jest.mock('../../api/loadTrainings', () => ({
  loadUsers: jest.fn(() => TRAININGS_MOCK),
}));

describe('questionnaire-coach-page', () => {
  it('should render questionnaire-coach page successfully for logged in user', () => {
    render(<QuestionnaireCoachPage />, {
      wrapper: getMockedRoleProviderWrapper(),
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
