import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/welcome-page';
import ErrorPage from '../pages/error-page';
import SignUpPage from '../pages/sign-up-page';
import SignInPage from '../pages/sign-in-page';
import { AppRoutes, AuthAppRoutes } from '../constants/constants';
import QuestionnaireCoachPage from '../pages/questionnaire-coach-page';
import QuestionnaireUserPage from '../pages/questionnaire-user-page';
import { AuthLayout, RootLayout, UnauthLayout } from '../components/layout';
import { RoleRouteMapper } from './role-route-mapper';

export const router = createBrowserRouter([
  {
    path: AppRoutes.Root,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        element: <UnauthLayout />,
        children: [
          {
            path: AppRoutes.Register,
            element: <SignUpPage />,
          },
          {
            path: AppRoutes.Login,
            element: <SignInPage />,
          },
          {
            path: AppRoutes.QuestionnaireAccountCoach,
            element: <QuestionnaireCoachPage />,
          },
          {
            path: AppRoutes.QuestionnaireAccountUser,
            element: <QuestionnaireUserPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: Object.values(AuthAppRoutes).map((path) => ({
          path,
          element: <RoleRouteMapper />,
        })),
      },
    ],
  },
]);
