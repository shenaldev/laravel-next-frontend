import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/models";

type AuthContextProps = {
  user: User | null;
  logUser?: (user: User) => void;
  removeUser?: () => void;
};

//CREATE CONTEXT
const AuthContext = createContext<AuthContextProps>({
  user: null,
  logUser: () => {},
  removeUser: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      const localUser = localStorage?.getItem("user");
      if (localUser) setUser(JSON.parse(localUser));
    }
  }, [user]);

  const logUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    logUser,
    removeUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
