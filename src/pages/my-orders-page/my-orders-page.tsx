import { Link } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';
import { useQuery } from '@tanstack/react-query';
import { loadMyOrders } from '../../api/loadMyOrders';
import MyOrderCard from '../../components/my-orders-card/my-order-card';

export default function MyOrdersPage(): JSX.Element {
  const myOrders = useQuery({
    queryKey: ['myOrders'],
    queryFn: loadMyOrders,
  });

  return (
    <div className="wrapper">
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <Link
                className="btn-flat btn-flat--underlined my-orders__back"
                to={AuthAppRoutes.MyAccount}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </Link>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button className="btn-filter-sort" type="button">
                      <span>Сумме</span>
                      <svg width={16} height={10} aria-hidden="true">
                        <use xlinkHref="#icon-sort-up" />
                      </svg>
                    </button>
                    <button className="btn-filter-sort" type="button">
                      <span>Количеству</span>
                      <svg width={16} height={10} aria-hidden="true">
                        <use xlinkHref="#icon-sort-down" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {myOrders.data?.map((myOrder) => (
                  <MyOrderCard key={myOrder.trainingId} myOrder={myOrder} />
                ))}
              </ul>
              <div className="show-more my-orders__show-more">
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
