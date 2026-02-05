import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-industrial-900 text-gray-100 font-sans selection:bg-industrial-accent selection:text-industrial-900 scroll-smooth flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[80px]"> {/* Add padding-top to account for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
