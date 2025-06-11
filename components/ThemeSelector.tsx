
import React from 'react';
import { ThemeOption, ThemeOptionValue } from '../types';
import { PaintBrushIcon } from './Icons';

interface ThemeSelectorProps {
  themes: ThemeOption[];
  selectedTheme: ThemeOptionValue;
  onThemeChange: (value: ThemeOptionValue) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, onThemeChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold text-sky-300 mb-3 flex items-center">
        <PaintBrushIcon className="w-6 h-6 mr-2 text-sky-400" />
        Choose Your Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.value}
            type="button"
            onClick={() => onThemeChange(theme.value)}
            className={`
              p-4 rounded-lg border-2 text-center transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
              ${selectedTheme === theme.value 
                ? 'bg-sky-500 border-sky-400 text-white shadow-lg scale-105' 
                : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-slate-200'}
            `}
          >
            <span className="font-medium text-sm sm:text-base">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
