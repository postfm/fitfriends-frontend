import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../context';

export function RootLayout(): JSX.Element {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
