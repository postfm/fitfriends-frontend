import { render, screen } from '@testing-library/react';

import ReviewCard from './review-card';
import { REVIEWS } from '../../mocks/reviews.mocks';

describe('review-card', () => {
  it('should include all review data', () => {
    render(<ReviewCard review={REVIEWS[0]} />);

    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Эта тренировка для меня зарядка по утрам, помогает проснуться. Это очень хорошая тренировка отличного тренера.'
    );
  });
});
