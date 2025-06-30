import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextType, UserResponse, User, UserLogin } from "../models/userLogin"
import api from '../services/api/api';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null)
  const [msg, setMsg] = useState('')

  function getStoreUSer() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser)
    }
  }
  useEffect(() => {
    getStoreUSer()
  }, []);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user?.token}`
  }

  async function login_(userLogin: UserLogin) {

    try {
      await api.post<UserResponse>('auth/login', userLogin, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const resUser: User = {
            token: response.data.token,
            login: response.data.username,
            role: response.data.roles
          }
          setUser(resUser);
          localStorage.setItem('user', JSON.stringify(resUser));
          setMsg("Autenticado com sucesso aguarde")
        })
    } catch (error) {
      if (!user)
        setMsg("Credenciais inválidas " + error)
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = "/"
  };

  return (
    <AuthContext.Provider value={{ user, login_, logout, isAuthenticated: !!user, msg, headers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
