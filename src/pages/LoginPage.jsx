import React, { useState } from 'react';
import { useLoginMutation } from '../store/states/authApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async () => {
    try {
      const tokens = await login({ username: email, password }).unwrap();
      console.log('User logged in', tokens);
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      const now = new Date().getTime();
      localStorage.setItem('timestamp', `${now + 5 * 60 * 1000}`);
      
      setLoggedInUser(email);
      
      setEmail('');
      setPassword('');
      navigate('/ListGamesPage');
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      {loggedInUser ? (
        <div className="flex flex-col justify-center items-center w-full mt-24">
          <div className="w-80 p-8 border-2 border-gray-500 rounded-lg shadow-lg mb-8 text-center">
            <p className="text-xl mb-4">Bienvenido, {loggedInUser}!</p>
            <img src="user.jpg" alt="Imagen de perfil" className="w-24 h-24 rounded-full mb-4" />
            <button 
              onClick={handleLogout} 
              className="w-full bg-red-500 hover:bg-red-700 active:bg-red-900 text-white font-bold py-2 px-4 rounded transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full mt-24">
          <div className="w-80 p-8 border-2 border-gray-500 rounded-lg shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-4">Login Page</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-500 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-500 rounded"
            />
            <button 
              onClick={handleLogin} 
              className="w-full bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>
      )}
      <footer className="text-gray-600 text-sm w-full py-4 bg-gray-200 text-center fixed bottom-0">
        &copy; 2024 MyWebsite. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
