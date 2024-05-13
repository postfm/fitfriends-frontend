import { Navigate, Outlet } from 'react-router-dom';
import Header from '../header';
import { AppRoutes } from '../../constants/constants';
import { useAuth } from '../../hooks';

export function AuthLayout(): JSX.Element {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={AppRoutes.Login} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
