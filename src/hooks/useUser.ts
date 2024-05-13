import { useAuth } from "./useAuth";

export const useUser = () => {
  const { user } = useAuth();
  
  if (!user) {
    throw new Error(
      `ERROR: User reached logged-in-only component with null 'user' in Auth context`
    );
  }

  return user;
};
