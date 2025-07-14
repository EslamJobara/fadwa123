import React, { useState } from 'react';
import { FiMenu, FiX, FiUser, FiSearch, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const SearchResults = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const location = useLocation();
  
  // Get initial search query from URL params
  const urlParams = new URLSearchParams(location.search);
  const initialQuery = urlParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // If there's an initial query, perform search on component mount
  React.useEffect(() => {
    if (initialQuery) {
      handleSearchFromQuery(initialQuery);
    }
  }, [initialQuery]);

  // Mock products data
  const allProducts = [
    {
      id: 1,
      name: 'Panadol Extra',
      category: 'Pain Relief',
      price: 25.50,
      originalPrice: 30.00,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      stockCount: 45,
      description: 'Fast-acting pain relief tablets'
    },
    {
      id: 2,
      name: 'Panadol Night',
      category: 'Pain Relief',
      price: 28.00,
      originalPrice: 32.00,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      stockCount: 23,
      description: 'Night-time pain relief with sleep aid'
    },
    {
      id: 3,
      name: 'Panadol Cold & Flu',
      category: 'Cold & Flu',
      price: 32.00,
      originalPrice: 35.00,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      stockCount: 67,
      description: 'Complete cold and flu relief'
    },
    {
      id: 4,
      name: 'Aspirin 100mg',
      category: 'Pain Relief',
      price: 15.00,
      originalPrice: 18.00,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      stockCount: 89,
      description: 'Low-dose aspirin for daily use'
    },
    {
      id: 5,
      name: 'Vitamin D3 1000IU',
      category: 'Vitamins',
      price: 45.00,
      originalPrice: 50.00,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      stockCount: 156,
      description: 'Essential vitamin D supplement'
    },
    {
      id: 6,
      name: 'Omega-3 Fish Oil',
      category: 'Supplements',
      price: 65.00,
      originalPrice: 70.00,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: false,
      stockCount: 0,
      description: 'High-quality omega-3 supplement'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchFromQuery = (query) => {
    // تجنب البحث المتكرر لنفس النص
    if (query === lastSearchTerm) {
      return;
    }
    
    setIsSearching(true);
    setLastSearchTerm(query);
    
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setSearchResults(results);
      setHasSearched(true);
      setSearchQuery(query);
      setIsSearching(false);
    }, 300);
  };

  const handleSearch = (query) => {
    handleSearchFromQuery(query);
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-teal-400">PharmaHub</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <a href="/" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
                Home
              </a>
              <a href="#" className="text-teal-400 font-medium relative after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-teal-400">
                Search
              </a>
              <a href="#" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
                Contact Us
              </a>
            </nav>
            
            {/* User Icon & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
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
            <div className="md:hidden bg-white border-t border-gray-100 py-4">
              <a href="/" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
                Home
              </a>
              <a href="#" className="block py-3 px-4 text-teal-400 font-medium bg-teal-50 border-l-4 border-teal-400">
                Search
              </a>
              <a href="#" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
                About Us
              </a>
              <a href="#" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
                Contact Us
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Search Section */}
      <section className="pt-24 pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Search for Products
            </h1>
            <p className="text-lg text-gray-600">
              Find the medications and healthcare products you need
            </p>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for products (e.g., Panadol, Aspirin, Vitamins...)"
            initialQuery={searchQuery}
            showDropdown={false}
            autoSearch={true}
          />
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-5">
          {isSearching ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Searching...
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Please wait while we find products for "{searchQuery}"
              </p>
            </div>
          ) : !hasSearched ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="w-12 h-12 text-teal-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Start Your Search
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Enter a product name or category in the search bar above to find what you're looking for
              </p>
              <div className="mt-6 text-sm text-gray-500">
                <p>💡 Tip: Start typing and results will appear automatically after 2 seconds, or press Enter to search immediately</p>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No Results Found
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any products matching "{searchQuery}". Try searching with different keywords.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-gray-600">
                  Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {!product.inStock && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </div>
                      )}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sale
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-sm text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>                                     
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-teal-600">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-lg text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          {product.inStock ? (
                            <span className="text-green-600 font-medium">
                              {product.stockCount} in stock
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;