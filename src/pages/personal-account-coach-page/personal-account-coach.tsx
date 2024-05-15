import { AuthAppRoutes } from '../../constants/constants';
import { Link } from 'react-router-dom';
import CertificateSlider from './components/slider';
import UserPersonalInfoCard from '../../components/user-personal-info-card';
import { useMutation } from '@tanstack/react-query';
import { useAuth, useUser } from '../../hooks';
import { User } from '../../types';
import { updateUser } from '../../api/updateUser';

export default function PersonalAccountCoach(): JSX.Element {
  const currentUser = useUser();
  const { saveCurrentUser } = useAuth();

  const newUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (params: { user: User }) => updateUser(params.user),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('user updated successfuly');
      saveCurrentUser(data);
    },
  });

  let certificates = currentUser.certificates?.split(',') || [];
  certificates =
    certificates.length < 3
      ? [...certificates, ...certificates, ...certificates]
      : certificates;

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserPersonalInfoCard
                onUserSave={(user) => newUser.mutate({ user })}
              />
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.MyTrainings}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-flash" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Мои тренировки
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.CreateTraining}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-add" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Создать тренировку
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.FriendList}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-friends" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AuthAppRoutes.MyOrders}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width={30} height={26} aria-hidden="true">
                          <use xlinkHref="#icon-bag" />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                        <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                            />
                            <img
                              src="img/content/thumbnails/nearest-gym-01.jpg"
                              srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                              width={330}
                              height={190}
                            />
                          </picture>
                        </div>
                        <div
                          className="thumbnail-spec-gym__header"
                          style={{ alignContent: 'center' }}
                        >
                          <h3 className="thumbnail-spec-gym__title">
                            Скоро тут будет интересно
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CertificateSlider certificates={certificates} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
