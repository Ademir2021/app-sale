import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginComponet from '../components/user/LoginComponent';
import type { UserLogin } from '../models/userLogin';

const Login: React.FC = () => {
  const { login_, msg: msgAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const [msg, setMsg] = useState('');

  const [user, setUser] = useState<UserLogin>(
    { login: "", password: "" }
  );

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values: any) => ({ ...values, [name]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login_(user);
    if (isAuthenticated) {
      setMsg(msgAuth)
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 3000)
    } else {
      setMsg('Credenciais Inválidas')
    }
  };

  return (
    <LoginComponet
      handleLogin={handleLogin}
      handleChange={handleChange}
      msg={msg}
    >
      {user}
    </LoginComponet>
  );
};

export default Login;


