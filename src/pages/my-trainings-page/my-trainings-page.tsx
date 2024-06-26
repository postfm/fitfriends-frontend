import { Training } from '../../types';
import { AuthAppRoutes, TimeOfTraining } from '../../constants/constants';
import { Link } from 'react-router-dom';
import { CheckboxFilter, RangeFilter } from '../../components/filters';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadMyTraining } from '../../api/loadMyTrainings';
import { useUser } from '../../hooks';
import TrainingCard from '../../components/training-card';

export default function MyTrainingsPage(): JSX.Element {
  const coach = useUser();
  const myTrainings = useQuery({
    queryKey: ['myTrainings', coach.id],
    queryFn: async () => (await loadMyTraining(coach.id)).data,
  });

  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 3000]);
  const [calorieFilter, setCalorieFilter] = useState<[number, number]>([
    1000, 5000,
  ]);
  const [ratingFilter, setRaitingFilter] = useState<[number, number]>([1, 5]);
  const [durations, setDurations] = useState<string[]>(TimeOfTraining);

  const trainingsToShow = (myTrainings.data || []).filter((training) => {
    const pricePredicate =
      priceFilter[0] <= training.price && training.price <= priceFilter[1];
    const caloriePredicate =
      calorieFilter[0] <= training.calories &&
      training.calories <= calorieFilter[1];
    const ratingPredicate =
      ratingFilter[0] <= training.rating && training.rating <= ratingFilter[1];
    const durationPredicate = durations.includes(training.duration);

    return (
      pricePredicate && caloriePredicate && ratingPredicate && durationPredicate
    );
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
                        onChange={setPriceFilter}
                      />
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <RangeFilter
                        title="Калории"
                        min={1000}
                        max={5000}
                        step={10}
                        defaultMin={1000}
                        defaultMax={5000}
                        onChange={setCalorieFilter}
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
                        onChange={setRaitingFilter}
                      />
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <CheckboxFilter
                        title="Длительность"
                        options={TimeOfTraining.map((key) => ({
                          key,
                          displayValue: key,
                        }))}
                        defaultSelected={TimeOfTraining}
                        onChange={setDurations}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {trainingsToShow.map(
                      (training: Training): JSX.Element => (
                        <li
                          key={training.training_id}
                          className="my-trainings__item"
                        >
                          <TrainingCard training={training} />
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
