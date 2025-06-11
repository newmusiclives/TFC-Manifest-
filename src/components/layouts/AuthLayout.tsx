import { Outlet } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center">
            <FaMusic className="text-white text-3xl mr-3" />
            <h1 className="text-white text-3xl font-bold">TrueFans Connect</h1>
          </div>
          <p className="text-blue-100 mt-6 text-xl">
            Connecting artists, venues, and fans in perfect harmony.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-white font-medium">
              "TrueFans Connect has revolutionized how we connect with our audience. It's the platform every artist needs."
            </p>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/30"></div>
              <div className="ml-3">
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-blue-100 text-sm">Indie Artist</p>
              </div>
            </div>
          </div>
          
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} TrueFans Connect. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="md:hidden mb-6 flex justify-center">
            <div className="flex items-center">
              <FaMusic className="text-blue-600 text-2xl mr-2" />
              <h1 className="text-gray-900 text-2xl font-bold">TrueFans Connect</h1>
            </div>
          </div>
          
          <Outlet />
        </div>
        
        {/* Mobile footer */}
        <div className="md:hidden mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TrueFans Connect. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
