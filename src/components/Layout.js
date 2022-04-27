import React, { useEffect, useState } from 'react';

import { Link, Outlet } from 'react-router-dom';

import { BsMoonStars } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';

export default function Layout() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className="navbar">
        <header>
          <Link to="/">Where in the world?</Link>
        </header>
        <div onClick={toggleTheme}>
          {theme === 'light' ? <BsMoonStars /> : <BsSun />}
        </div>
      </div>
      <main className="container">
        <Outlet />
      </main>
      <footer>&copy; React</footer>
    </>
  );
}
