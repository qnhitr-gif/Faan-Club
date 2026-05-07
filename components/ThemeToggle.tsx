'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="ml-2 px-2.5 py-1.5 rounded-md text-secondary hover:text-primary hairline-strong border"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="text-ui">{dark ? '☾' : '☀'}</span>
    </button>
  );
}
