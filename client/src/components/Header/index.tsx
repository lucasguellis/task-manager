'use client';

import React from 'react';
import Logo from '../Logo';
import { useNavigate } from 'react-router-dom';

export default function Header(): React.ReactElement {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="w-full shadow-md rounded-lg">
      <nav
        aria-label="Global"
        className="mx-auto h-15 max-w-7xl justify-between p-3 lg:px-8 flex flex-row items-center"
      >
        <div className="-m-1.5 p-1.5 flex flex-row items-center">
          <Logo size="11" />
          <h2 className={'font-semibold pl-3'}>Task Manager</h2>
        </div>

        <div className="">
          <button
            type={'button'}
            onClick={handleLogout}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Sair <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
