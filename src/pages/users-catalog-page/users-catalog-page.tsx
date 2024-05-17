import { useNavigate } from 'react-router-dom';
import {
  AuthAppRoutes,
  LevelOfTraining,
  Locations,
  TypesOfTrainings,
} from '../../constants/constants';
import { useQuery } from '@tanstack/react-query';
import { loadUsers } from '../../api/loadUsers';
import UserCardThumbnail from '../../components/user-card-thumbnail/user-card-thumbnail';
import {
  CheckboxFilter,
  RadioFilter,
  RadioToggleInput,
} from '../../components/filters';
import { Role, User } from '../../types';
import { useState } from 'react';
import { intersection } from 'lodash';

const filterCoach = (u: User) => u.roles.includes(Role.coach);
const filterUser = (u: User) => u.roles.includes(Role.user);
const types = TypesOfTrainings.map((t) => t.toLocaleLowerCase());

export default function UsersCatalogPage(): JSX.Element {
  const [sortFilter, setSortFilter] = useState<string>(Role.coach);
  const [levelFilter, setLevelFilter] = useState<string>();
  const [typeFilter, setTypeFilter] = useState<string[]>(types);
  const [locationFilter, setLocationFilter] = useState<string[]>(Locations);
  const navigate = useNavigate();
  const users = useQuery({
    queryKey: ['users'],
    queryFn: loadUsers,
  });

  const filteredUsers = (users?.data || []).filter((user) => {
    const locationPredicate = locationFilter.includes(user.location);
    const typePredicate =
      intersection(typeFilter, user.typeOfTraining).length > 0;
    const levelPredicate = levelFilter
      ? levelFilter === user.levelOfTrain
      : true;

    return locationPredicate && typePredicate && levelPredicate;
  });

  const sortedUsers =
    sortFilter === Role.coach
      ? [
          ...filteredUsers.filter(filterCoach),
          ...filteredUsers.filter(filterUser),
        ]
      : [
          ...filteredUsers.filter(filterUser),
          ...filteredUsers.filter(filterCoach),
        ];

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                    type="button"
                    onClick={() => {
                      navigate(AuthAppRoutes.Main);
                    }}
                  >
                    <svg width={14} height={10} aria-hidden="true">
                      <use xlinkHref="#arrow-left" />
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <CheckboxFilter
                        title="Локация, станция метро"
                        options={Locations.map((key) => ({
                          key,
                          displayValue: key,
                        }))}
                        defaultSelected={Locations}
                        showMoreButton
                        showMoreMaxItems={5}
                        onChange={setLocationFilter}
                      />
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <CheckboxFilter
                        title="Специализация"
                        options={types.map((key) => ({
                          key,
                          displayValue: key,
                        }))}
                        defaultSelected={types}
                        showMoreButton
                        showMoreMaxItems={5}
                        onChange={setTypeFilter}
                      />
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">
                        Ваш уровень
                      </h4>
                      <RadioToggleInput
                        options={LevelOfTraining.map((key) => ({
                          key,
                          displayValue: key,
                        }))}
                        onChange={setLevelFilter}
                      />
                    </div>
                    <div className="user-catalog-form__block">
                      <RadioFilter
                        title="Сортировка"
                        options={[...Object.values(Role)]}
                        defaultSelected="тренер"
                        onChange={setSortFilter}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {sortedUsers.map((user) => (
                      <UserCardThumbnail key={user.id} user={user} />
                    ))}
                  </ul>
                  <div className="show-more users-catalog__show-more">
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
