import React from 'react';
import { MyOrder } from '../../types';
import TrainingCard from '../training-card';

interface MyOrderCardProps {
  myOrder: MyOrder;
}

const MyOrderCard: React.FC<MyOrderCardProps> = ({ myOrder }) => (
  <li className="my-orders__item">
    <div className="thumbnail-training">
      <TrainingCard training={myOrder.training} showMoreStyle="minimal" />
      <div className="thumbnail-training__total-info" style={{ marginTop: 14 }}>
        <div className="thumbnail-training__total-info-card">
          <svg width={32} height={32} aria-hidden="true">
            <use xlinkHref="#icon-chart" />
          </svg>
          <p className="thumbnail-training__total-info-value">
            {myOrder.amount}
          </p>
          <p className="thumbnail-training__total-info-text">
            Куплено тренировок
          </p>
        </div>
        <div className="thumbnail-training__total-info-card">
          <svg width={31} height={28} aria-hidden="true">
            <use xlinkHref="#icon-wallet" />
          </svg>
          <p className="thumbnail-training__total-info-value">
            {myOrder.sum}
            <span>₽</span>
          </p>
          <p className="thumbnail-training__total-info-text">Общая сумма</p>
        </div>
      </div>
    </div>
  </li>
);

export default MyOrderCard;
