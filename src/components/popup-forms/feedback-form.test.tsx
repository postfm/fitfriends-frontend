import { render, screen } from '@testing-library/react';

import FeedbackForm from './feedback-form';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { noop } from 'lodash';

describe('feedback-form', () => {
  it('should feedback form correctly', () => {
    render(<FeedbackForm trainingId={1} onSave={noop} />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
      'Оцените тренировку'
    );
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent(
      'Поделитесь своими впечатлениями о тренировке'
    );
  });
});
