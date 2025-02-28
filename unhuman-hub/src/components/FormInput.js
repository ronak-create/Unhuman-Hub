import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const FormInput = ({ icon: Icon, type, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative mb-4">
      <div className="flex items-center">
        <Icon className="absolute left-3 text-gray-400 w-5 h-5" />
        <input
          type={inputType}
          className={`w-full pl-10 pr-10 py-3 bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'} 
            rounded-lg focus:outline-none text-gray-100 placeholder-gray-500 transition-all`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-gray-300 w-5 bg-transparent focus:outline-none"
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-1 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
