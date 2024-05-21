import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { AppRoutes } from '../constants/constants';
import { useLocalStorage } from '../hooks';
import { noop } from 'lodash';
import {
  Tokens,
  USER_KEY_NAME,
  clearTokens,
  saveTokens,
} from '../client/token';
import { setHeaderToken } from '../client/client';
import { logout } from '../api/logout';

interface AuthContext {
  user: User | null;
  authUser: (data: User, tokens: Tokens) => void;
  setCurrentUser: (data: User) => void;
  saveCurrentUser: (data: User) => void;
  logoutCurrentUser: () => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  authUser: noop,
  setCurrentUser: noop,
  saveCurrentUser: noop,
  logoutCurrentUser: noop,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<User | null>(USER_KEY_NAME, null);
  const navigate = useNavigate();

  const setCurrentUser = (data: User) => {
    setUser(data);
    navigate(AppRoutes.Main);
  };

  const authUser = (user: User, tokens: Tokens) => {
    if (tokens.accessToken) {
      setHeaderToken(tokens.accessToken);
      saveTokens(tokens);
      setCurrentUser(user);
    }
  };

  const logoutCurrentUser = async () => {
    await logout();
    clearTokens();
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      authUser,
      setCurrentUser,
      saveCurrentUser: setUser,
      logoutCurrentUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
