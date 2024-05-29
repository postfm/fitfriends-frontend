import { render, screen } from '@testing-library/react';

import UserCardThumbnail from './user-personal-info-card';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { noop } from 'lodash';

describe('user-personal-info-card', () => {
  it('should render component correctly', () => {
    render(<UserCardThumbnail onUserSave={noop} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('user-personal-info-card')).toBeInTheDocument();
  });

  it('should contain correct data of the logged in user', () => {
    render(<UserCardThumbnail onUserSave={noop} />, {
      wrapper: getMockedRoleProviderWrapper(Role.user),
    });

    expect(screen.getByTestId('user-personal-info-card')).toHaveTextContent(
      'Петроградская'
    );
    expect(screen.getByTestId('user-personal-info-card')).toHaveTextContent(
      'Привет! Я Евгений и мне 27 лет. Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по боксу.'
    );
    expect(screen.getByTestId('user-personal-info-card')).toHaveTextContent(
      'Евгений'
    );
    expect(screen.getByTestId('user-personal-info-card')).toHaveTextContent(
      'мужской'
    );
  });
});
