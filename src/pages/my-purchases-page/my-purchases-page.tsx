import { useNavigate } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';
import { useUser } from '../../hooks';
import { loadMyOrders } from '../../api/loadMyOrders';
import { useQuery } from '@tanstack/react-query';
import TrainingCard from '../../components/training-card';
import { useState } from 'react';

export default function MyPurchasesPage(): JSX.Element {
  const [onlyActive, setOnlyActive] = useState(false);
  const navigate = useNavigate();
  const currentUser = useUser();

  const purchases = useQuery({
    queryKey: ['puchases'],
    queryFn: loadMyOrders,
  });

  const myPuchases = purchases.data?.filter(
    (purchase) => purchase.user.id === currentUser.id
  );

  const handleCheckBoxChange = () => {
    setOnlyActive(!onlyActive);
  };

  return (
    <div className="wrapper">
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                className="btn-flat my-purchases__back"
                type="button"
                onClick={() => navigate(AuthAppRoutes.MyAccount)}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div
                    className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                    data-validate-type="checkbox"
                  >
                    <label>
                      <input
                        type="checkbox"
                        defaultValue="user-agreement-1"
                        name="user-agreement"
                        checked={!onlyActive}
                        onChange={handleCheckBoxChange}
                      />
                      <span className="custom-toggle__icon">
                        <svg width={9} height={6} aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        {onlyActive ? 'Только активные' : 'Все'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {myPuchases?.map((myPuchase) => (
                  <li
                    className="my-purchases__item"
                    key={myPuchase.training.trainingId}
                  >
                    {onlyActive ? (
                      +myPuchase.amount > 0 && (
                        <TrainingCard training={myPuchase.training} />
                      )
                    ) : (
                      <TrainingCard training={myPuchase.training} />
                    )}
                  </li>
                ))}
              </ul>
              <div className="show-more my-purchases__show-more">
                <button
                  className="btn show-more__button show-more__button--more"
                  type="button"
                >
                  Показать еще
                </button>
                <button
                  className="btn show-more__button show-more__button--to-top"
                  type="button"
                >
                  Вернуться в начало
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
