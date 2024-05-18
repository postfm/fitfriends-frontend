import { useQuery } from '@tanstack/react-query';
import { loadFriendsCoach } from '../../api/loadFriendsCoach';
import FriendCoachCard from '../../components/friend-coach-card';
import { Link } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';
import { loadPersonalTraining } from '../../api/loadPersonalTraining';
import { PersonalTraining } from '../../types';

export default function FriendsListCoachPage(): JSX.Element {
  const friendsCoach = useQuery({
    queryKey: ['friendsCoach'],
    queryFn: loadFriendsCoach,
  });
  const personalTrainings = useQuery({
    queryKey: ['personalTrainings'],
    queryFn: loadPersonalTraining,
  });

  return (
    <div className="wrapper">
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <Link
                className="btn-flat friends-list__back"
                to={AuthAppRoutes.MyAccount}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </Link>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {friendsCoach.data?.map((friendCoach) => (
                  <li className="friends-list__item" key={friendCoach.id}>
                    <FriendCoachCard
                      initiator={friendCoach}
                      personalTrainings={
                        personalTrainings.data as PersonalTraining[]
                      }
                    />
                  </li>
                ))}
              </ul>
              <div className="show-more friends-list__show-more">
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
