import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className={`
          w-4 h-4 rounded
          border-gray-700 bg-black/30
          text-[#1E90FF] 
          focus:ring-2 focus:ring-[#1E90FF]
          disabled:opacity-50
          transition-colors
          ${className}
        `}
        {...props}
      />
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
};

export default Checkbox;