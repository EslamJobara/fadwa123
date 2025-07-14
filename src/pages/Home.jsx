import React, { useState } from 'react';
import { FiMenu, FiX, FiUser, FiSearch } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchOverlay = () => {
    setShowSearchOverlay(!showSearchOverlay);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-teal-400">PharmaHub</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <a href="#" className="text-teal-400 font-medium relative after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-teal-400">
                Home
              </a>
              <a href="#" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
                Services
              </a>
              <a href="#" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
                Contact Us
              </a>
            </nav>
            
            {/* User Icon & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <div 
                className="p-2 rounded-full hover:bg-teal-50 cursor-pointer transition-colors"
                onClick={toggleSearchOverlay}
              >
                <FiSearch className="w-6 h-6 text-teal-400" />
              </div>
              <div className="p-2 rounded-full hover:bg-teal-50 cursor-pointer transition-colors">
                <FiUser className="w-6 h-6 text-teal-400" />
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-teal-50 transition-colors"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6 text-teal-400" />
                ) : (
                  <FiMenu className="w-6 h-6 text-teal-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-in slide-in-from-top duration-300">
              <a href="#" className="block py-3 px-4 text-teal-400 font-medium bg-teal-50 border-l-4 border-teal-400">
                Home
              </a>
              <a href="#" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
                About Us
              </a>
              <a href="#" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
                Services
              </a>
              <a href="#" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
                Contact Us
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-teal-50 to-teal-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Hero Text */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Your shortcut<br />for healing
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Access quality healthcare and medications with ease. Your trusted partner in wellness and recovery.
              </p>
              <button 
                onClick={() => window.location.href = '/search'}
                className="bg-teal-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Search for Products
              </button>
            </div>
            
            {/* Hero Visual */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Pharmacy Building */}
              <div className="relative">
                {/* Main Building */}
                <div className="w-36 h-32 bg-teal-400 rounded-xl relative shadow-2xl shadow-teal-400/30">
                  {/* Cross Sign */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold">
                    +
                  </div>
                  
                  {/* Windows */}
                  <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2">
                    <div className="h-5 bg-white/30 rounded"></div>
                    <div className="h-5 bg-white/30 rounded"></div>
                    <div className="h-5 bg-white/30 rounded"></div>
                    <div className="h-5 bg-white/30 rounded"></div>
                  </div>
                </div>
                
                {/* Side Building */}
                <div className="absolute -right-8 top-5 w-16 h-24 bg-teal-500 rounded-r-xl"></div>
                
                {/* Person Figure */}
                <div className="absolute -bottom-2 -left-4">
                  <div className="w-8 h-8 bg-orange-300 rounded-full mb-1"></div>
                  <div className="w-6 h-10 bg-blue-500 rounded ml-1"></div>
                </div>
                
                {/* Medical Elements */}
                <div className="absolute -top-8 -right-12">
                  <div className="w-5 h-2 bg-red-500 rounded-full transform rotate-45 absolute top-5 right-8"></div>
                  <div className="w-5 h-2 bg-yellow-500 rounded-full transform -rotate-30 absolute top-10 right-10"></div>
                  <div className="w-4 h-4 bg-green-500 rounded absolute top-2 right-12 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-1 bg-green-600 absolute"></div>
                      <div className="w-1 h-4 bg-green-600 absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-80 h-52 bg-gradient-to-br from-teal-400 to-teal-500 rounded-3xl transform rotate-45 -translate-y-24 translate-x-40 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-52 h-80 bg-gradient-to-br from-teal-400 to-teal-500 rounded-3xl transform -rotate-30 translate-y-40 -translate-x-24 opacity-10"></div>
      </section>

      {/* Search Overlay */}
      {showSearchOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-32">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Search for Products
            </h2>
            <SearchBar 
              placeholder="Search for products (e.g., Panadol, Aspirin, Vitamins...)"
              showDropdown={true}
              onClose={toggleSearchOverlay}
            />
          </div>
        </div>
      )}

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Chronic Category */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 8v16M8 16h16" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Chronic</h3>
            </div>
            
            {/* Cosmetics Category */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M12 18c0-2.5 1.5-5 4-5s4 2.5 4 5" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="16" cy="12" r="2" fill="#4ECDC4"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Cosmetics</h3>
            </div>
            
            {/* Normal Category */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="12" y="12" width="8" height="8" rx="1" stroke="#4ECDC4" strokeWidth="2"/>
                    <path d="M14 16h4" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Normal</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Section */}
      <section className="h-52 bg-gradient-to-br from-teal-400 to-teal-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-72 bg-white/10 rounded-3xl transform rotate-30 -translate-y-24 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-52 bg-white/5 rounded-3xl transform -rotate-45 translate-y-24 -translate-x-32"></div>
      </section>
    </div>
  );
};

export default Home;