
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatAssistant from './components/ChatAssistant';
import { MOCK_PRODUCTS } from './constants';
import { Product, FilterState, CartItem, Vehicle } from './types';
import { geminiService } from './services/gemini';
import { Star, ShoppingCart, Info, CheckCircle2, AlertTriangle, ArrowRight, X, Camera, CreditCard, Truck, ShieldCheck, Loader2, Plus, Minus, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailsQuantity, setDetailsQuantity] = useState(1);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [visualSearchPrompt, setVisualSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  // Post-Add-to-Cart Popup State
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<CartItem | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    manufacturer: '',
    series: '',
    model: '',
    year: '',
    performance: [],
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    condition: [],
    availability: []
  });

  // Filter Logic
  useEffect(() => {
    let result = products;

    if (filters.manufacturer) {
      result = result.filter(p => p.compatibility.make.includes(filters.manufacturer) || p.compatibility.make.includes('Any'));
    }
    if (filters.series) {
      result = result.filter(p => !p.compatibility.series || p.compatibility.series.includes(filters.series) || p.compatibility.series.includes('Standard'));
    }
    if (filters.model) {
      result = result.filter(p => p.compatibility.model.includes(filters.model) || p.compatibility.model.includes('Any'));
    }
    if (filters.year) {
      const yr = parseInt(filters.year);
      result = result.filter(p => p.compatibility.years.includes(yr) || p.compatibility.make.includes('Any'));
    }
    if (filters.performance.length > 0) {
      result = result.filter(p => filters.performance.includes(p.performanceLevel));
    }
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    if (filters.priceRange[1] < 1000) {
      result = result.filter(p => p.price <= filters.priceRange[1]);
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleSmartSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const parsed = await geminiService.parseSearchQuery(query);
      if (parsed) {
        setFilters(prev => ({
          ...prev,
          manufacturer: parsed.make || prev.manufacturer,
          model: parsed.model || prev.model,
          year: parsed.year ? parsed.year.toString() : prev.year,
          categories: parsed.partType ? [parsed.partType] : prev.categories
        }));
      }
    } catch (e) {
      console.error("Search failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisualSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const analysis = await geminiService.identifyPartFromImage(base64);
      setVisualSearchPrompt(analysis || 'Could not identify part.');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setLastAddedProduct({ ...product, quantity });
    setShowCartPopup(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = () => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setIsProcessingOrder(false);
      setCart([]);
      setActivePage('order-success');
    }, 2000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400'; 
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        onSearch={handleSmartSearch}
        onOpenVisualSearch={() => setIsVisualSearchOpen(true)}
        onNavigate={setActivePage}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activePage === 'home' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar 
              filters={filters} 
              onFilterChange={(updates) => setFilters(prev => ({ ...prev, ...updates }))} 
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {filters.manufacturer ? `${filters.manufacturer} ${filters.model} Parts` : "Recommended Parts"}
                  </h1>
                  <p className="text-sm text-slate-500">{filteredProducts.length} items found</p>
                </div>
                <div className="flex space-x-2">
                  <select className="bg-white border-slate-200 rounded-lg text-sm p-2 focus:ring-blue-500 shadow-sm">
                    <option>Sort by: Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Customer Rating</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDetailsQuantity(1);
                        setActivePage('details');
                      }}
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onError={handleImageError}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 flex flex-col items-end space-y-1">
                          <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wide">
                            {product.brand}
                          </div>
                          <div className={`px-2 py-1 rounded-md text-[9px] font-bold text-white shadow-sm uppercase tracking-wide ${
                            product.performanceLevel === 'High Performance' ? 'bg-orange-600' : 
                            product.performanceLevel === 'Racing' ? 'bg-red-600' : 'bg-slate-600'
                          }`}>
                            {product.performanceLevel}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-blue-600 font-medium mb-1">
                          <span className="bg-blue-50 px-2 py-0.5 rounded">{product.category}</span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 line-clamp-1 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-3">
                          <div className="flex text-amber-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400">({product.reviews})</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                          <button 
                            className="bg-slate-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                  <AlertTriangle className="h-12 w-12 text-slate-300 mb-4" />
                  <p className="text-lg font-medium text-slate-900">No parts found matching your criteria</p>
                  <button 
                    className="mt-4 text-blue-600 font-bold"
                    onClick={() => setFilters({
                      manufacturer: '', series: '', model: '', year: '', performance: [], categories: [], brands: [], priceRange: [0, 1000], condition: [], availability: []
                    })}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === 'details' && selectedProduct && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              className="mb-6 flex items-center text-slate-500 hover:text-blue-600 font-medium"
              onClick={() => setActivePage('home')}
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Catalog
            </button>
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-8 lg:border-r border-slate-100 bg-slate-50">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-inner bg-white">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      onError={handleImageError}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedProduct.brand}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        selectedProduct.performanceLevel === 'High Performance' ? 'bg-orange-100 text-orange-700' : 
                        selectedProduct.performanceLevel === 'Racing' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {selectedProduct.performanceLevel}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> {selectedProduct.availability}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedProduct.name}</h1>
                  
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : ''}`} />
                      ))}
                      <span className="ml-2 text-slate-600 font-medium">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600 font-medium">{selectedProduct.reviews} reviews</span>
                  </div>

                  <div className="text-4xl font-bold text-slate-900 mb-8">${selectedProduct.price.toFixed(2)}</div>

                  <p className="text-slate-600 mb-10 leading-relaxed">{selectedProduct.description}</p>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Quantity</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        <button 
                          onClick={() => setDetailsQuantity(Math.max(1, detailsQuantity - 1))}
                          className="p-3 hover:bg-slate-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-slate-900">{detailsQuantity}</span>
                        <button 
                          onClick={() => setDetailsQuantity(detailsQuantity + 1)}
                          className="p-3 hover:bg-slate-200 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-sm text-slate-500 italic">
                        Limit 10 per customer
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center text-lg shadow-xl shadow-slate-200"
                      onClick={() => {
                        addToCart(selectedProduct, detailsQuantity);
                      }}
                    >
                      <ShoppingCart className="h-6 w-6 mr-3" />
                      Add to Cart
                    </button>
                    <button className="px-8 border border-slate-200 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                      Save for Later
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mt-10">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-blue-600" />
                      Part Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                      {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500 font-medium uppercase">{key}</span>
                          <span className="text-sm text-slate-900 font-semibold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ... Cart, Checkout, Success, Account Sections ... */}
        {activePage === 'cart' && (
          <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
            {cart.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                      <img src={item.image} onError={handleImageError} className="h-20 w-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-500">{item.brand}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <button className="px-3 py-1 hover:bg-slate-50" onClick={() => {
                              if (item.quantity > 1) {
                                setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
                              }
                            }}>-</button>
                            <span className="px-3 py-1 font-medium">{item.quantity}</span>
                            <button className="px-3 py-1 hover:bg-slate-50" onClick={() => {
                              setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
                            }}>+</button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="w-full lg:w-80 h-fit bg-slate-900 text-white rounded-3xl p-8 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Shipping</span>
                      <span className="text-white text-xs uppercase font-bold tracking-widest text-blue-400">Free</span>
                    </div>
                    <div className="border-t border-slate-700 pt-4 flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span className="text-blue-500">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActivePage('checkout')}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                  >
                    Secure Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                <ShoppingCart className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
                <p className="text-slate-500 mt-2">Browse our catalog to find parts for your vehicle</p>
                <button 
                  className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold"
                  onClick={() => setActivePage('home')}
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {/* ... Checkout, Order Success, Account ... */}
        {activePage === 'checkout' && (
          <div className="max-w-5xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <ShieldCheck className="h-8 w-8 mr-3 text-blue-600" />
              Checkout
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                    <Truck className="h-5 w-5 mr-3 text-blue-600" />
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                    <input type="text" placeholder="Last Name" className="p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                    <input type="text" placeholder="Street Address" className="md:col-span-2 p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                    <input type="text" placeholder="City" className="p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                    <input type="text" placeholder="Zip Code" className="p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                    Payment Details
                  </h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Card Number" className="w-full p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                      <input type="text" placeholder="CVV" className="p-3 bg-slate-50 rounded-xl border-slate-200 text-sm focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Your Order</h3>
                  <div className="max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center mb-4 text-sm">
                        <span className="text-slate-400">{item.quantity}x {item.name}</span>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-700 pt-6 space-y-4">
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span className="text-blue-500">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessingOrder}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessingOrder ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-3" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${cartTotal.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'order-success' && (
          <div className="max-w-2xl mx-auto py-20 text-center animate-in zoom-in-95 duration-500">
            <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Your order #ORD-{Math.floor(Math.random() * 90000) + 10000} has been placed successfully. 
              We'll send a confirmation email with tracking details shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setActivePage('home')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">Continue Shopping</button>
              <button onClick={() => setActivePage('account')} className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">Track Order</button>
            </div>
          </div>
        )}

        {activePage === 'account' && (
          <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center space-x-6 mb-12">
              <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">JD</div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">John Doe</h1>
                <p className="text-slate-500">Member since January 2024</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Visual Search Modal */}
      {isVisualSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsVisualSearchOpen(false)} />
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">Visual AI Search</h3>
                  <p className="text-xs text-slate-400">Identify parts with your camera</p>
                </div>
              </div>
              <button onClick={() => setIsVisualSearchOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-10 text-center">
              {isLoading ? (
                <div className="py-12">
                  <div className="h-20 w-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <p className="text-lg font-bold text-slate-900 animate-pulse">AI is identifying your part...</p>
                </div>
              ) : visualSearchPrompt ? (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <div className="bg-blue-50 p-6 rounded-2xl text-left border border-blue-100 mb-6">
                    <h4 className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Analysis Result</h4>
                    <p className="text-slate-800 leading-relaxed font-medium">{visualSearchPrompt}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsVisualSearchOpen(false);
                      setVisualSearchPrompt('');
                    }}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                  >
                    View Matching Parts
                  </button>
                </div>
              ) : (
                <div className="mb-8 p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 hover:bg-white hover:border-blue-400 transition-all cursor-pointer group">
                  <input type="file" id="visual-search-input" className="hidden" accept="image/*" onChange={handleVisualSearch} />
                  <label htmlFor="visual-search-input" className="cursor-pointer">
                    <Camera className="h-16 w-16 text-slate-300 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                    <p className="text-slate-900 font-bold text-lg">Upload or Take Photo</p>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add-to-Cart Confirmation Popup */}
      {showCartPopup && lastAddedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCartPopup(false)} />
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-green-600 p-4 text-white text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-bold">Item Added to Cart!</span>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-20 w-20 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                  <img src={lastAddedProduct.image} onError={handleImageError} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 line-clamp-2">{lastAddedProduct.name}</h4>
                  <p className="text-sm text-slate-500">Qty: {lastAddedProduct.quantity} • ${ (lastAddedProduct.price * lastAddedProduct.quantity).toFixed(2) }</p>
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setShowCartPopup(false);
                    setActivePage('cart');
                  }}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-slate-800 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  View Cart & Checkout
                </button>
                <button 
                  onClick={() => setShowCartPopup(false)}
                  className="w-full bg-slate-100 text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowCartPopup(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <ChatAssistant />
      
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-6">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">By Vehicle</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Replacement Parts</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Performance Parts</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Installation Guides</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Return Policy</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm font-bold tracking-tight text-white">AutoPart<span className="text-blue-500">AI</span></div>
            <p className="text-[10px]">&copy; 2026 AutoPart AI Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
