// src/components/ThemeToggle.tsx
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full shadow-md transition bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};
