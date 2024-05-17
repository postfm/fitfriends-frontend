import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes, AuthAppRoutes } from '../../constants/constants';
import { useQuery } from '@tanstack/react-query';
import { loadFriendsUser } from '../../api/loadFriendsUser';
import FriendsUserCard from '../../components/friends-user-card/friends-user-card';
import { loadPersonalTraining } from '../../api/loadPersonalTraining';
import { PersonalTraining } from '../../types';

export default function FriendsListUserPage(): JSX.Element {
  const navigate = useNavigate();
  const friendsUser = useQuery({
    queryKey: ['friendsUser'],
    queryFn: loadFriendsUser,
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
              <button
                className="btn-flat friends-list__back"
                type="button"
                onClick={() => navigate(AuthAppRoutes.MyAccount)}
              >
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
                <span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {friendsUser.data?.map((friend) => (
                  <li
                    className="friends-list__item"
                    key={friend.id}
                    onClick={() =>
                      navigate(
                        generatePath(AppRoutes.UserCard, {
                          id: String(friend.id),
                        })
                      )
                    }
                  >
                    <FriendsUserCard
                      user={friend}
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
