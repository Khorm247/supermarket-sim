import {createContext, useState, useContext, ReactNode} from 'react';

interface UserContextProps {
  userId: string | null;
  setUserId: (id: string) => void;
}

type UserProviderProps = {
    children: ReactNode
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: Readonly<UserProviderProps>) {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};