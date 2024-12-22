import React from 'react';
import { motion } from 'framer-motion';

interface VariablesFormProps {
  variables: Record<string, string>;
  onVariableChange: (key: string, value: string) => void;
}

const VariablesForm: React.FC<VariablesFormProps> = ({ variables, onVariableChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Variables</h3>
      <div className="grid gap-4">
        {Object.entries(variables).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onVariableChange(key, e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#1E90FF] focus:outline-none"
              placeholder={`Entrez ${key}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VariablesForm;