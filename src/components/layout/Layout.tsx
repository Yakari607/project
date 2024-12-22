import React from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;