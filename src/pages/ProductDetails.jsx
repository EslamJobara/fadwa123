import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiUser, FiStar, FiShoppingCart, FiHeart, FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  // Mock products data
  const allProducts = [
    {
      id: 1,
      name: 'Panadol Extra',
      category: 'Pain Relief',
      price: 25.50,
      originalPrice: 30.00,
      images: [
        'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      rating: 4.5,
      reviews: 128,
      inStock: true,
      stockCount: 45,
      description: 'Fast-acting pain relief tablets with paracetamol and caffeine for enhanced effectiveness.',
      longDescription: 'Panadol Extra provides fast and effective relief from pain and discomfort. Each tablet contains 500mg of paracetamol and 65mg of caffeine, which work together to provide enhanced pain relief. Suitable for headaches, dental pain, period pain, and general aches and pains.',
      activeIngredients: ['Paracetamol 500mg', 'Caffeine 65mg'],
      dosage: 'Adults and children over 12 years: Take 2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.',
      warnings: ['Do not exceed the stated dose', 'Keep out of reach of children', 'Consult your doctor if symptoms persist'],
      manufacturer: 'GSK Consumer Healthcare',
      expiryDate: '12/2025'
    },
    {
      id: 2,
      name: 'Panadol Night',
      category: 'Pain Relief',
      price: 28.00,
      originalPrice: 32.00,
      images: [
        'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      rating: 4.3,
      reviews: 89,
      inStock: true,
      stockCount: 23,
      description: 'Night-time pain relief with sleep aid for better rest.',
      longDescription: 'Panadol Night combines effective pain relief with a gentle sleep aid to help you get a good night\'s rest. Contains paracetamol for pain relief and diphenhydramine to help you fall asleep naturally.',
      activeIngredients: ['Paracetamol 500mg', 'Diphenhydramine HCl 25mg'],
      dosage: 'Adults: Take 2 tablets 20 minutes before bedtime. Do not exceed 2 tablets in 24 hours.',
      warnings: ['May cause drowsiness', 'Do not drive or operate machinery', 'Avoid alcohol'],
      manufacturer: 'GSK Consumer Healthcare',
      expiryDate: '08/2025'
    }
  ];

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stockCount || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiRefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
          </div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

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
              <a href="/search" className="text-gray-600 font-medium hover:text-teal-400 transition-colors">
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
              <a href="/search" className="block py-3 px-4 text-gray-600 font-medium hover:text-teal-400 hover:bg-teal-50 transition-all">
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

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-teal-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/search" className="hover:text-teal-400 transition-colors">Search</a>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-teal-400' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-teal-600">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      In Stock ({product.stockCount} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockCount}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-teal-400 text-white py-4 px-6 rounded-xl font-semibold hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <FiHeart className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FiTruck className="w-6 h-6 text-teal-400" />
                  </div>
                  <p className="text-sm text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FiShield className="w-6 h-6 text-teal-400" />
                  </div>
                  <p className="text-sm text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FiRefreshCw className="w-6 h-6 text-teal-400" />
                  </div>
                  <p className="text-sm text-gray-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                  <p className="text-gray-600 mb-6">{product.longDescription}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Ingredients</h3>
                  <ul className="space-y-2">
                    {product.activeIngredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Dosage & Usage</h3>
                  <p className="text-gray-600 mb-6">{product.dosage}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Warnings</h3>
                  <ul className="space-y-2 mb-6">
                    {product.warnings.map((warning, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        {warning}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Product Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Manufacturer:</span> {product.manufacturer}</p>
                      <p><span className="font-medium">Expiry Date:</span> {product.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;