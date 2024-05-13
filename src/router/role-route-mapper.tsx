import { useLocation, Navigate, matchRoutes } from 'react-router-dom';
import { useUser } from '../hooks';
import { AuthAppRoutes } from '../constants/constants';
import { Role } from '../types';
import PersonalAccountCoach from '../pages/personal-account-coach-page';
import PersonalAccountUserPage from '../pages/personal-account-user-page';
import FriendsListCoachPage from '../pages/friends-list-coach-page';
import FriendsListUserPage from '../pages/friends-list-user-page';
import ErrorPage from '../pages/error-page';
import MainPage from '../pages/main-page/main-page';
import CreateTrainingPage from '../pages/create-training-page';
import MyTrainingsPage from '../pages/my-trainings-page';
import MyOrdersPage from '../pages/my-orders-page';
import UsersCatalogPage from '../pages/users-catalog-page';
import TrainingCardCoachPage from '../pages/training-card-coach-page';
import TrainingCardUserPage from '../pages/training-card-user-page';
import UserCardCoachPage from '../pages/user-card-coach-page';
import UserCardUserPage from '../pages/user-card-user-page';
import TrainingCatalogPage from '../pages/training-catalog-page';
import MyPurchasesPage from '../pages/my-purchases-page';

const NavigateToMyAccount = () => (
  <Navigate to={AuthAppRoutes.MyAccount} replace />
);

function getPersonalAccountPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return PersonalAccountCoach;
    case Role.user:
      return PersonalAccountUserPage;
    default:
      return null;
  }
}

function getFriedListPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return FriendsListCoachPage;
    case Role.user:
      return FriendsListUserPage;
    default:
      return null;
  }
}

function getMainPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return NavigateToMyAccount;
    case Role.user:
      return MainPage;
    default:
      return null;
  }
}

function getCreateTrainingPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return CreateTrainingPage;
    case Role.user:
    default:
      return null;
  }
}

function getMyTrainingsPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return MyTrainingsPage;
    case Role.user:
    default:
      return null;
  }
}

function getMyOrdersPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return MyOrdersPage;
    case Role.user:
    default:
      return null;
  }
}

function getUserCataloguePage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.user:
      return UsersCatalogPage;
    case Role.coach:
    default:
      return null;
  }
}

function getTrainingCataloguePage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.user:
      return TrainingCatalogPage;
    case Role.coach:
      return PersonalAccountCoach;
    default:
      return null;
  }
}

function getTrainingCardPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
      return TrainingCardCoachPage;
    case Role.user:
      return TrainingCardUserPage;
    default:
      return null;
  }
}

function getUserCardPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
    case Role.user:
      return UserCardUserPage;
    default:
      return null;
  }
}

function getCoachCardPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.coach:
    case Role.user:
      return UserCardCoachPage;
    default:
      return null;
  }
}

function getMyPurchasesPage(role: Role): React.ElementType | null {
  switch (role) {
    case Role.user:
      return MyPurchasesPage;
    case Role.coach:
    default:
      return null;
  }
}

export const RoleRouteMapper: React.FC = () => {
  const userRole = useUser().roles as Role;
  const location = useLocation();

  const matchedPattern = matchRoutes(
    Object.values(AuthAppRoutes).map((path) => ({ path })),
    location.pathname
  )?.[0];

  const routeMap: Record<string, React.ElementType | null> = {
    [AuthAppRoutes.Main]: getMainPage(userRole),
    [AuthAppRoutes.MyAccount]: getPersonalAccountPage(userRole),
    [AuthAppRoutes.FriendList]: getFriedListPage(userRole),
    [AuthAppRoutes.CreateTraining]: getCreateTrainingPage(userRole),
    [AuthAppRoutes.MyTrainings]: getMyTrainingsPage(userRole),
    [AuthAppRoutes.MyOrders]: getMyOrdersPage(userRole),
    [AuthAppRoutes.UserCatalogue]: getUserCataloguePage(userRole),
    [AuthAppRoutes.TrainingCatalogue]: getTrainingCataloguePage(userRole),
    [AuthAppRoutes.TrainingCard]: getTrainingCardPage(userRole),
    [AuthAppRoutes.UserCard]: getUserCardPage(userRole),
    [AuthAppRoutes.СoachCard]: getCoachCardPage(userRole),
    [AuthAppRoutes.MyPurchases]: getMyPurchasesPage(userRole),
  };

  const Component = matchedPattern ? routeMap[matchedPattern.route.path] : null;

  return Component ? <Component /> : <ErrorPage />;
};
