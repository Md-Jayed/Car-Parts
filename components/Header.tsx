
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Bell, Menu, X, Camera } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onOpenVisualSearch: () => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onSearch, onOpenVisualSearch, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">AutoPart<span className="text-blue-500">AI</span></span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Ask AI: 'Brake pads for 2020 Ford F-150'..."
                className="w-full bg-slate-800 border-none rounded-full py-2 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 text-sm placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <button 
                type="button" 
                onClick={onOpenVisualSearch}
                className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 hover:text-blue-400"
              >
                <Camera className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-slate-300 hover:text-white relative" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-slate-300 hover:text-white" onClick={() => onNavigate('account')}>
              <User className="h-6 w-6" />
            </button>
            <button className="text-slate-300 hover:text-white">
              <Bell className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 p-4 border-t border-slate-700">
          <form onSubmit={handleSearchSubmit} className="mb-4 relative">
            <input
              type="text"
              placeholder="Search parts..."
              className="w-full bg-slate-900 border-none rounded-lg py-2 pl-10 pr-4 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </form>
          <nav className="flex flex-col space-y-4">
            <button className="flex items-center space-x-2 py-2 border-b border-slate-700" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="h-5 w-5" /> <span>Cart ({cartCount})</span>
            </button>
            <button className="flex items-center space-x-2 py-2 border-b border-slate-700" onClick={() => onNavigate('account')}>
              <User className="h-5 w-5" /> <span>Account</span>
            </button>
            <button className="flex items-center space-x-2 py-2 border-b border-slate-700" onClick={() => onNavigate('home')}>
              <span>Browse Catalog</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
