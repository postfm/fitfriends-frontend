import { Link } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';
import { useQuery } from '@tanstack/react-query';
import MyOrderCard from '../../components/my-orders-card/my-order-card';
import { loadMyPurchases } from '../../api/loadMyPurchases';
import { useState } from 'react';

const DEFAULT_SORTING_TYPE = 'cost';

enum SortingType {
  cost = 'cost',
  quantity = 'quantity',
}

enum SortingDirection {
  asc = 'ASC',
  desc = 'DESC',
}

export default function MyOrdersPage(): JSX.Element {
  const [sortingType, setSortingType] = useState(DEFAULT_SORTING_TYPE);
  const [sortingDirection, setSortingDirection] = useState(true);
  const [url, setUrl] = useState('');

  const myOrders = useQuery({
    queryKey: ['myPurchases', url],
    queryFn: async () => (await loadMyPurchases(url)).data,
  });

  const handleButtonQuantityClick = () => {
    setSortingType(SortingType.quantity);
    setSortingDirection(!sortingDirection);
    setUrl(
      `sortingType=${sortingType}&sortDirection=${
        sortingDirection ? SortingDirection.asc : SortingDirection.desc
      }`
    );
  };

  const handleButtonCostClick = () => {
    setSortingType(SortingType.cost);
    setSortingDirection(!sortingDirection);
    setUrl(
      `sortingType=${sortingType}&sortDirection=${
        sortingDirection ? SortingDirection.asc : SortingDirection.desc
      }`
    );
  };

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
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={handleButtonCostClick}
                    >
                      <span>Сумме</span>
                      <svg
                        width={16}
                        height={10}
                        aria-hidden="true"
                        style={
                          sortingDirection
                            ? { rotate: '0deg' }
                            : { rotate: '-180deg' }
                        }
                      >
                        <use xlinkHref="#icon-sort-up" />
                      </svg>
                    </button>
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={handleButtonQuantityClick}
                    >
                      <span>Количеству</span>
                      <svg
                        width={16}
                        height={10}
                        aria-hidden="true"
                        style={
                          sortingDirection
                            ? { rotate: '-180deg' }
                            : { rotate: '0deg' }
                        }
                      >
                        <use xlinkHref="#icon-sort-down" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {myOrders.data?.map((myOrder) => (
                  <MyOrderCard key={myOrder.training_id} myOrder={myOrder} />
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
