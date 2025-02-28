import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import AuthContext from "../context/AuthContext";
import FormInput from './FormInput';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" }}
      );
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormInput
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            
            <FormInput
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold
                transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-400 hover:text-purple-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;