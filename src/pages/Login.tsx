import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginComponet from '../components/user/LoginComponent';
import type { UserLogin } from '../models/userLogin';

const Login: React.FC = () => {
  const { login_, msg: msgAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const [user, setUser] = useState<UserLogin>(
    { login: "centroserra@gmail.com", password: "873700xla" }
  );
  const [msg, setMsg] = useState('');

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const login = login_(user);
    if (login) {
      setMsg(msgAuth)
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 3000)
    } else {
      setMsg('Erro')
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


