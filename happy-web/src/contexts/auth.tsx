import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface AuthContextState {
  user: Record<string, unknown> | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  user: Record<string, unknown>;
  token: string;
}
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

// eslint-disable-next-line react/prop-types
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    let token = sessionStorage.getItem(`@${process.env.REACT_APP_NAME}:token`);
    let user = sessionStorage.getItem(`@${process.env.REACT_APP_NAME}:user`);

    if (!token || !user) {
      token = localStorage.getItem(`@${process.env.REACT_APP_NAME}:token`);
      user = localStorage.getItem(`@${process.env.REACT_APP_NAME}:user`);
    }

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const history = useHistory();

  const signIn = useCallback(
    async ({ email, password, remember = false }) => {
      const response = await api.post<AuthState>('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      sessionStorage.setItem(
        `@${process.env.REACT_APP_NAME}:user`,
        JSON.stringify(user),
      );
      sessionStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, token);
      if (remember) {
        localStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, token);
        localStorage.setItem(
          `@${process.env.REACT_APP_NAME}:user`,
          JSON.stringify(user),
        );
      }
      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
      history.push('/dashboard');
    },
    [history],
  );

  const signOut = useCallback(() => {
    sessionStorage.clear();
    localStorage.removeItem(`@${process.env.REACT_APP_NAME}:token`);
    localStorage.removeItem(`@${process.env.REACT_APP_NAME}:user`);
    history.push('/');
    delete api.defaults.headers.authorization;
    setData({} as AuthState);
  }, [history]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { useAuth, AuthProvider };
