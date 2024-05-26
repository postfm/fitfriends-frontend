import { render, screen } from '@testing-library/react';

import MyOrderCard from './my-order-card';
import { PurchaseMock } from '../../test-utils/purchase.mock';
import { Role } from '../../types';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';

describe('my-order-card', () => {
  it('should render amount and quantity correctly', () => {
    render(
      <MyOrderCard myOrder={{ ...PurchaseMock, cost: 9999, quantity: 998 }} />,
      {
        wrapper: getMockedRoleProviderWrapper(Role.coach),
      }
    );

    expect(screen.getByText('9999')).toBeInTheDocument();
    expect(screen.getByText('998')).toBeInTheDocument();
  });
});
