import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check saved theme in localStorage
    const saved = localStorage.getItem('boutique_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    // Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Requirements state: Apply specific CSS class to the <body> tag and save to localStorage
    if (isDark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('boutique_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('boutique_theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleDarkMode, setIsDark };
}
