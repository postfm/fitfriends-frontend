import { render, screen } from '@testing-library/react';

import { PurchaseForm } from './purchase-form';
import { getMockedRoleProviderWrapper } from '../../test-utils/provider-wrapper';
import { Role } from '../../types';
import { Training } from '../../mocks/training.mocks';
import { noop } from 'lodash';

describe('purchase-form', () => {
  it('should render all purchase form buttons correctly', () => {
    render(<PurchaseForm orderId={1} training={Training} onSave={noop} />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('should render correct training name', () => {
    render(<PurchaseForm orderId={1} training={Training} onSave={noop} />, {
      wrapper: getMockedRoleProviderWrapper(Role.coach),
    });

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('CROSSFIT');
  });
});
