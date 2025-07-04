import { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const defaultContextValue: UserContextType = {
  user: null,
  loading: true,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);  
      setLoading(false);   
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
