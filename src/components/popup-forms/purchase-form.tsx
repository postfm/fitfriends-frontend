import { ChangeEvent, useState } from 'react';
import { Order, Training } from '../../types';
import { renderCash, renderTotalCost } from '../../utils';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../../api/createOrder';

interface PurchaseFormProps {
  training: Training | undefined;
}

const Value = {
  increment: 1,
  decrement: -1,
};

const TYPE_ORDER = 'абонемент';

export function PurchaseForm({ training }: PurchaseFormProps): JSX.Element {
  const [amountTraining, setAmauntTraining] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [order, setOrder] = useState({});

  const handleInputhChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(evt.target.value);
  };

  const handleButtonIncrementClick = () => {
    setAmauntTraining(amountTraining + Value.increment);
  };

  const handleButtonDecrementClick = () => {
    setAmauntTraining(amountTraining + Value.decrement);
  };

  const handleButtonByClick = () => {
    setOrder({
      type: TYPE_ORDER,
      price: training?.price,
      amount: amountTraining,
      pay: paymentMethod,
    });
  };

  const newOrder = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (params: { order: Order }) => createOrder(params.order),
    onSuccess: () => {
      // eslint-disable-next-line no-console
      console.log('order create successfuly', newOrder);
    },
  });

  return (
    <div className="popup__content popup__content--purchases">
      <div className="popup__product">
        <div className="popup__product-image">
          <picture>
            <img src={training?.image} width={98} height={80} alt="" />
          </picture>
        </div>
        <div className="popup__product-info">
          <h3 className="popup__product-title">{training?.name}</h3>
          <p className="popup__product-price">
            {renderCash(training?.price as number)}
          </p>
        </div>
        <div className="popup__product-quantity">
          <p className="popup__quantity">Количество</p>
          <div className="input-quantity">
            <button
              className="btn-icon btn-icon--quantity"
              type="button"
              aria-label="minus"
              onClick={handleButtonDecrementClick}
              disabled={amountTraining <= 0}
            >
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-minus" />
              </svg>
            </button>
            <div className="input-quantity__input">
              <label>
                <input type="text" value={amountTraining} size={2} readOnly />
              </label>
            </div>
            <button
              className="btn-icon btn-icon--quantity"
              type="button"
              aria-label="plus"
              onClick={handleButtonIncrementClick}
              disabled={amountTraining >= 50}
            >
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-plus" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <section className="payment-method">
        <h4 className="payment-method__title">Выберите способ оплаты</h4>
        <ul className="payment-method__list">
          <li className="payment-method__item">
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name="payment-purchases"
                  aria-label="Visa."
                  defaultChecked
                  value="visa"
                  onChange={handleInputhChange}
                />
                <span className="btn-radio-image__image">
                  <svg width={58} height={20} aria-hidden="true">
                    <use xlinkHref="#visa-logo" />
                  </svg>
                </span>
              </label>
            </div>
          </li>
          <li className="payment-method__item">
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name="payment-purchases"
                  aria-label="Мир."
                  value={'mir'}
                  onChange={handleInputhChange}
                />
                <span className="btn-radio-image__image">
                  <svg width={66} height={20} aria-hidden="true">
                    <use xlinkHref="#mir-logo" />
                  </svg>
                </span>
              </label>
            </div>
          </li>
          <li className="payment-method__item">
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name="payment-purchases"
                  aria-label="Iomoney."
                  value="umoney"
                  onChange={handleInputhChange}
                />
                <span className="btn-radio-image__image">
                  <svg width={106} height={24} aria-hidden="true">
                    <use xlinkHref="#iomoney-logo" />
                  </svg>
                </span>
              </label>
            </div>
          </li>
        </ul>
      </section>
      <div className="popup__total">
        <p className="popup__total-text">Итого</p>
        <svg
          className="popup__total-dash"
          width={310}
          height={2}
          aria-hidden="true"
        >
          <use xlinkHref="#dash-line" />
        </svg>
        <p className="popup__total-price">
          {renderTotalCost(amountTraining * Number(training?.price))}
        </p>
      </div>
      <div className="popup__button">
        <button className="btn" type="button" onClick={handleButtonByClick}>
          Купить
        </button>
      </div>
    </div>
  );
}
