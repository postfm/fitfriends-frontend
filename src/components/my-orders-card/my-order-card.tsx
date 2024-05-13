import React from 'react';
import { MyOrder } from '../../types';

interface MyOrderCardProps {
  myOrder: MyOrder;
}

const MyOrderCard: React.FC<MyOrderCardProps> = ({ myOrder }) => (
  <li className="my-orders__item">
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img src={myOrder.image} width={330} height={190} alt="" />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {myOrder.price}
          </span>
          <span>₽</span>
        </p>
        <h2 className="thumbnail-training__title">{myOrder.name}</h2>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${myOrder.type}`}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${myOrder.calories}`}</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <span className="thumbnail-training__rate-value">
              {myOrder.rating}
            </span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{myOrder.description}</p>
        </div>
        <a className="btn-flat btn-flat--underlined thumbnail-training__button-orders">
          <svg width={18} height={18} aria-hidden="true">
            <use xlinkHref="#icon-info" />
          </svg>
          <span>Подробнее</span>
        </a>
      </div>
      <div className="thumbnail-training__total-info">
        <div className="thumbnail-training__total-info-card">
          <svg width={32} height={32} aria-hidden="true">
            <use xlinkHref="#icon-chart" />
          </svg>
          <p className="thumbnail-training__total-info-value">
            {+myOrder.quantity}
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
            {+myOrder.cost}
            <span>₽</span>
          </p>
          <p className="thumbnail-training__total-info-text">Общая сумма</p>
        </div>
      </div>
    </div>
  </li>
);

export default MyOrderCard;
