import { useQuery } from '@tanstack/react-query';
import { loadTrainings } from '../../api/loadTrainings';
import MyTrainingCard from '../../components/my-training-card';
import { Training } from '../../types';
import { AuthAppRoutes } from '../../constants/constants';
import { Link } from 'react-router-dom';
import { RangeFilter } from '../../components/filters';

export default function MyTrainingsPage(): JSX.Element {
  const trainings = useQuery({
    queryKey: ['trainings'],
    queryFn: loadTrainings,
  });

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <Link
                    className="btn-flat btn-flat--underlined my-training-form__btnback"
                    to={AuthAppRoutes.MyAccount}
                  >
                    <svg width={14} height={10} aria-hidden="true">
                      <use xlinkHref="#arrow-left" />
                    </svg>
                    <span>Назад</span>
                  </Link>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form className="my-training-form__form">
                    <div className="my-training-form__block my-training-form__block--price">
                      <RangeFilter
                        title="Цена, ₽"
                        min={0}
                        max={5000}
                        step={50}
                        defaultMin={0}
                        defaultMax={3000}
                      />{' '}
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <RangeFilter
                        title="Калории"
                        min={1000}
                        max={5000}
                        step={10}
                        defaultMin={1000}
                        defaultMax={5000}
                      />
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <RangeFilter
                        title="Рейтинг"
                        min={1}
                        max={5}
                        step={1}
                        defaultMin={1}
                        defaultMax={5}
                        hideValueInputs
                        showOutputs
                      />
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">
                        Длительность
                      </h4>
                      <ul className="my-training-form__check-list">
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultValue="duration-1"
                                name="duration"
                              />
                              <span className="custom-toggle__icon">
                                <svg width={9} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-check" />
                                </svg>
                              </span>
                              <span className="custom-toggle__label">
                                10 мин - 30 мин
                              </span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultValue="duration-1"
                                name="duration"
                                defaultChecked
                              />
                              <span className="custom-toggle__icon">
                                <svg width={9} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-check" />
                                </svg>
                              </span>
                              <span className="custom-toggle__label">
                                30 мин - 50 мин
                              </span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultValue="duration-1"
                                name="duration"
                              />
                              <span className="custom-toggle__icon">
                                <svg width={9} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-check" />
                                </svg>
                              </span>
                              <span className="custom-toggle__label">
                                50 мин - 80 мин
                              </span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultValue="duration-1"
                                name="duration"
                              />
                              <span className="custom-toggle__icon">
                                <svg width={9} height={6} aria-hidden="true">
                                  <use xlinkHref="#arrow-check" />
                                </svg>
                              </span>
                              <span className="custom-toggle__label">
                                80 мин - 100 мин
                              </span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {trainings.data?.map(
                      (training: Training): JSX.Element => (
                        <MyTrainingCard
                          key={training.trainingId}
                          training={training}
                        />
                      )
                    )}
                  </ul>
                  <div className="show-more my-trainings__show-more">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
