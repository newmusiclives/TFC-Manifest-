import { Outlet } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import Navbar from '../navigation/Navbar';
import Sidebar from '../navigation/Sidebar';
import { useState } from 'react';

interface MainLayoutProps {
  session: Session | null;
}

const MainLayout = ({ session }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        session={session} 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar session={session} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
