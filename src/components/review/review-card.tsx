import React from 'react';
import { Review } from '../../types';
import Avatar from '../avatar';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
  <li className="reviews-side-bar__item">
    <div className="review">
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <Avatar src={review.user.avatar} width={64} height={64} />
          </picture>
        </div>
        <span className="review__user-name">{review.user.name}</span>
        <div className="review__rating">
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <span>{review.grade}</span>
        </div>
      </div>
      <p className="review__comment">{review.text}</p>
    </div>
  </li>
);

export default ReviewCard;
