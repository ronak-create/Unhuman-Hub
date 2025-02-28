import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import FormInput from './FormInput';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isAdmin: formData.isAdmin
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate("/login");
      } else {
        setErrors({ general: data.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Create Account
          </h2>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              icon={User}
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value }})}
              error={errors.name}
            />

            <FormInput
              icon={Mail}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value }})}
              error={errors.email}
            />

            <FormInput
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value }})}
              error={errors.password}
            />

            <FormInput
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value }})}
              error={errors.confirmPassword}
            />

            <label className="flex items-center mb-6 text-gray-300">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="mr-2 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              Register as Admin
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold
                transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-purple-400 hover:text-purple-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;