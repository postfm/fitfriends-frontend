import { useQuery } from '@tanstack/react-query';
import { loadTrainings } from '../../api/loadTrainings';
import { useNavigate } from 'react-router-dom';
import {
  RangeFilter,
  CheckboxFilter,
  RadioFilter,
} from '../../components/filters';
import { uniqBy } from 'lodash';
import TrainingCard from '../../components/training-card';
import { AppRoutes } from '../../constants/constants';

export default function TrainingCatalogPage(): JSX.Element {
  const navigate = useNavigate();
  const trainings = useQuery({
    queryKey: ['trainings'],
    queryFn: loadTrainings,
  });

  const options = uniqBy(
    (trainings.data || []).map((training) => ({
      key: training.type,
      displayValue: training.type,
    })),
    'key'
  );

  const SORT_OPTIONS = ['Дешевле', 'Дороже', 'Бесплатные'];

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                    type="button"
                    onClick={() => navigate(AppRoutes.Main)}
                  >
                    <svg width={14} height={10} aria-hidden="true">
                      <use xlinkHref="#arrow-left" />
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <RangeFilter
                        title="Цена, ₽"
                        min={0}
                        max={5000}
                        step={50}
                        defaultMin={0}
                        defaultMax={3000}
                      />
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                      <RangeFilter
                        title="Калории"
                        min={1000}
                        max={5000}
                        step={10}
                        defaultMin={1000}
                        defaultMax={5000}
                      />
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                      <RangeFilter
                        title="Рейтинг"
                        min={1}
                        max={5}
                        step={1}
                        defaultMin={1}
                        defaultMax={5}
                        showOutputs
                      />
                    </div>
                    {options.length > 0 && (
                      <div className="gym-catalog-form__block gym-catalog-form__block--type">
                        <CheckboxFilter
                          title="Тип"
                          options={options}
                          defaultSelected={options.map((option) => option.key)}
                        />
                      </div>
                    )}
                    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                      <RadioFilter title="Сортировка" options={SORT_OPTIONS} />
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {(trainings.data || []).map((training) => (
                    <li
                      key={training.trainingId}
                      className="training-catalog__item"
                    >
                      <TrainingCard training={training} />
                    </li>
                  ))}
                </ul>
                <div className="show-more training-catalog__show-more">
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
        </section>
      </main>
    </div>
  );
}
