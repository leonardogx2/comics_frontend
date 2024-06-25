import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../services/user/auth";
import { RefreshToken, User } from "@/interfaces";
import { isAxiosError } from "axios";

interface IAuthContext {
  loading: boolean;
  user?: User;
  signIn: (
    data: SignInProps,
  ) => Promise<{ isSigned: boolean; message?: string }>;
  signOut: VoidFunction;
}

interface SignInProps {
  email: string;
  password: string;
  keepSession: boolean;
}

interface IProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<RefreshToken | undefined>();

  useEffect(() => {
    setLoading(true);
    if (user?.firstName) sessionStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    if (refreshToken)
      sessionStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    setLoading(false);
  }, [refreshToken]);
  useEffect(() => {
    setLoading(true);
    if (accessToken) sessionStorage.setItem("accessToken", accessToken);
    setLoading(false);
  }, [accessToken]);

  async function signIn({
    email,
    password,
    keepSession,
  }: SignInProps): Promise<{ isSigned: boolean; message?: string }> {
    let isSigned: boolean = false;
    let message: string | undefined;

    await auth({ email, password, keepSession })
      .then(({ user, accessToken, refreshToken }) => {
        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        isSigned = true;
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          message = err.response?.data[0].message;
        } else {
          message = "Erro inesperado, tente novamente mais tarde";
        }
      });

    return { isSigned, message };
  }

  async function signOut() {
    sessionStorage.clear();
    setUser(undefined);
  }

  useEffect(() => {
    setLoading(true);
    const userCookie = sessionStorage.getItem("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuthContext };
