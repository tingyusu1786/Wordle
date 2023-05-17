import React, { useState } from 'react';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    const root = window.document.documentElement;
    darkMode ? root.classList.remove('dark') : root.classList.add('dark');
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <div className='w-screen mb-3'>
      <button className='absolute top-3 left-4 h-12 w-20 rounded-xl p-2 hover:bg-gray-100' onClick={toggleDarkMode}>
        <span className='text-2xl'>{darkMode ? '🌞' : '🌚'}</span>
      </button>
      <h1 className={`text-3xl font-bold text-center my-4 dark:text-white text-black`}>Wordle</h1>
    </div>
  );
};

export default Header;
