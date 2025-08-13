import React from 'react';
import { Bell, Search, ChevronDown, Menu, User, ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ currentPage = 'dashboard' }) => {
  const isMainDashboard = currentPage === 'dashboard';
  const location=useLocation()
const navigate=useNavigate()
  // In a real app, this would use the router's navigation
  const handleBack = () => {
    navigate("/")
    // history.back() or router.back() would go here
  };

  return (
    <header className='max-w-7xl w-full flex items-center justify-between px-4 py-2 bg-white shadow-md'>
        <div className='w-full flex items-center'>
            {location.pathname !=="/" && <button onClick={handleBack} className='font-bold text-blue-400'>Back</button>}
            <h1 className='text-6xl mx-auto font-serif text-center font-bold text-green-400'>Welcome</h1>
        </div>
    </header>
  );
};

// Example usage with different pag

export default Header;