import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextType, User, UserLogin } from "../models/userLogin"
import api from '../services/api/api';

const headers = {
  'Content-Type': 'application/json',
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser)
    }
  }, []);

  async function login_(userLogin: UserLogin) {
    
    try {
      await api.post('auth/login', userLogin, { headers })
        .then(response => {
          const resUser: User = {
            login: userLogin.login,
            token: response.data.token,
            role: response.data.role || 'admin'
          };
          setUser(resUser);
          localStorage.setItem('user', JSON.stringify(resUser));
          setMsg("Autenticado com sucesso aguarde")
        })
    } catch (error) {
      if(!user)
      setMsg("Credenciais inválidas " + error)
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = "/"
  };

  return (
    <AuthContext.Provider value={{ user, login_, logout, isAuthenticated: !!user, msg }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
