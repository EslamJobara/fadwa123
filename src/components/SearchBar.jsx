import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for products (e.g., Panadol, Aspirin, Vitamins...)",
  showDropdown = true,
  onClose = null,
  initialQuery = "",
  autoSearch = false
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Mock products data for suggestions
  const allProducts = [
    { id: 1, name: 'Panadol Extra', category: 'Pain Relief' },
    { id: 2, name: 'Panadol Night', category: 'Pain Relief' },
    { id: 3, name: 'Panadol Cold & Flu', category: 'Cold & Flu' },
    { id: 4, name: 'Aspirin 100mg', category: 'Pain Relief' },
    { id: 5, name: 'Aspirin Plus', category: 'Pain Relief' },
    { id: 6, name: 'Vitamin D3 1000IU', category: 'Vitamins' },
    { id: 7, name: 'Vitamin C 500mg', category: 'Vitamins' },
    { id: 8, name: 'Vitamin B Complex', category: 'Vitamins' },
    { id: 9, name: 'Omega-3 Fish Oil', category: 'Supplements' },
    { id: 10, name: 'Calcium + Magnesium', category: 'Supplements' },
    { id: 11, name: 'Ibuprofen 400mg', category: 'Pain Relief' },
    { id: 12, name: 'Cough Syrup', category: 'Cold & Flu' },
    { id: 13, name: 'Throat Lozenges', category: 'Cold & Flu' },
    { id: 14, name: 'Antacid Tablets', category: 'Digestive Health' },
    { id: 15, name: 'Probiotics', category: 'Digestive Health' }
  ];

  useEffect(() => {
    if (searchQuery.length >= 2 && showDropdown) {
      setIsLoading(true);
      
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout for 1.5 seconds
      timeoutRef.current = setTimeout(() => {
        const filteredProducts = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 4); // Limit to 4 products
        
        setSuggestions(filteredProducts);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 1500);
    } else if (searchQuery.length >= 2 && autoSearch) {
      // Auto search functionality for search page
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        if (onSearch) {
          onSearch(searchQuery);
        }
      }, 1500);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, showDropdown, autoSearch, onSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
    if (onClose) onClose();
  };

  const handleSeeMore = () => {
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    if (onClose) onClose();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-full focus:border-teal-400 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-400 text-white p-3 rounded-full hover:bg-teal-500 transition-colors"
          >
            <FiSearch className="w-5 h-5" />
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Loading indicator */}
      {isLoading && searchQuery.length >= 2 && showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 p-4 z-50">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-400"></div>
            <span className="ml-2 text-gray-600">Searching...</span>
          </div>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && !isLoading && showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-[60] max-h-80 overflow-y-auto">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product.id)}
              className="w-full px-4 py-3 text-left hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-gray-800">{product.name}</div>
                <div className="text-sm text-teal-600">{product.category}</div>
              </div>
              <FiSearch className="w-4 h-4 text-gray-400" />
            </button>
          ))}
          
          {/* See More option */}
          <button
            onClick={handleSeeMore}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-200 text-teal-600 font-medium flex items-center justify-between"
          >
            <span>See more results for "{searchQuery}"</span>
            <FiSearch className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* No suggestions found */}
      {showSuggestions && suggestions.length === 0 && !isLoading && searchQuery.length >= 2 && showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 p-4 z-[60]">
          <div className="text-center text-gray-600">
            <FiSearch className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No suggestions found for "{searchQuery}"</p>
            <button
              onClick={handleSeeMore}
              className="mt-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              Search anyway
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;