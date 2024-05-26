import { render, screen } from '@testing-library/react';

import PopupModal from './popup-modal';

describe('popup-modal', () => {
  it('should render title and content of the modal correctly', () => {
    render(
      <PopupModal title="Test modal" isOpen onClose={jest.fn()}>
        mymodal
      </PopupModal>
    );

    expect(screen.getByText('Test modal')).toBeInTheDocument();
    expect(screen.getByText('mymodal')).toBeInTheDocument();
  });
});
