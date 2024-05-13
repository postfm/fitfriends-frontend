import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { AppRoutes } from '../../constants/constants';

export function UnauthLayout(): JSX.Element {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={AppRoutes.Main} />;
  }

  return <Outlet />;
}
