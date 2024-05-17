import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { AppRoutes } from '../constants/constants';
import { useLocalStorage } from '../hooks';
import { noop } from 'lodash';

interface AuthContext {
  user: User | null;
  setCurrentUser: (data: User) => void;
  saveCurrentUser: (data: User) => void;
  logoutCurrentUser: () => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setCurrentUser: noop,
  saveCurrentUser: noop,
  logoutCurrentUser: noop,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const navigate = useNavigate();

  const setCurrentUser = (data: User) => {
    setUser(data);
    navigate(AppRoutes.Main);
  };

  const logoutCurrentUser = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      setCurrentUser,
      saveCurrentUser: setUser,
      logoutCurrentUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
