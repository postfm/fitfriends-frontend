import { noop } from 'lodash';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '../context';
import { USERS_MOCK } from '../mocks/users.mocks';
import { Role } from '../types';

interface MockedLoggedInWrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const MockedCoachProviderWrapper: React.FC<MockedLoggedInWrapperProps> = ({
  children,
}) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user: USERS_MOCK.data.find((u) => u.email === 'july@trainer.com')!,
          authUser: noop,
          setCurrentUser: noop,
          saveCurrentUser: noop,
          logoutCurrentUser: noop,
        }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  </BrowserRouter>
);

const MockedUserProviderWrapper: React.FC<MockedLoggedInWrapperProps> = ({
  children,
}) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user: USERS_MOCK.data.find((u) => u.email === 'evgeny@user.com')!,
          authUser: noop,
          setCurrentUser: noop,
          saveCurrentUser: noop,
          logoutCurrentUser: noop,
        }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  </BrowserRouter>
);

const MockedNotLoggedInProviderWrapper: React.FC<
  MockedLoggedInWrapperProps
> = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user: null,
          authUser: noop,
          setCurrentUser: noop,
          saveCurrentUser: noop,
          logoutCurrentUser: noop,
        }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  </BrowserRouter>
);

export const getMockedRoleProviderWrapper = (role?: Role) => {
  switch (role) {
    case 'тренер':
      return MockedCoachProviderWrapper;
    case 'пользователь':
      return MockedUserProviderWrapper;
    default:
      return MockedNotLoggedInProviderWrapper;
  }
};
