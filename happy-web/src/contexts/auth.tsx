import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
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
    const token = sessionStorage.getItem('@Happy:token');
    const user = sessionStorage.getItem('@Happy:user');
    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const history = useHistory();

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post<AuthState>('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      sessionStorage.setItem('@Happy:user', JSON.stringify(user));
      sessionStorage.setItem('@Happy:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
      history.push('/dashboard');
    },
    [history],
  );

  const signOut = useCallback(() => {
    sessionStorage.clear();
    history.push('/');

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
