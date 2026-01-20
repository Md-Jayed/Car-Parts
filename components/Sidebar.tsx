
import React from 'react';
import { Filter, SlidersHorizontal, ChevronDown, Rocket } from 'lucide-react';
import { MAKES, MODELS_BY_MAKE, SERIES_BY_MAKE, CATEGORIES, PERFORMANCE_LEVELS } from '../constants';
import { FilterState } from '../types';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center">
            <SlidersHorizontal className="h-5 w-5 mr-2 text-blue-600" />
            Filters
          </h2>
          <button 
            className="text-xs text-blue-600 font-medium hover:underline"
            onClick={() => onFilterChange({
              manufacturer: '', series: '', model: '', year: '', performance: [], categories: [], brands: [], priceRange: [0, 1000]
            })}
          >
            Clear All
          </button>
        </div>

        {/* Vehicle Selection Group */}
        <div className="mb-8 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Vehicle Specs</h3>
          
          {/* Manufacturer */}
          <div>
            <label className="block text-xs text-slate-500 mb-1 ml-1">Manufacturer</label>
            <select 
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-2 focus:ring-blue-500"
              value={filters.manufacturer}
              onChange={(e) => onFilterChange({ manufacturer: e.target.value, series: '', model: '' })}
            >
              <option value="">Select Manufacturer</option>
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Series */}
          <div>
            <label className="block text-xs text-slate-500 mb-1 ml-1">Series</label>
            <select 
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!filters.manufacturer}
              value={filters.series}
              onChange={(e) => onFilterChange({ series: e.target.value })}
            >
              <option value="">Select Series</option>
              {filters.manufacturer && SERIES_BY_MAKE[filters.manufacturer]?.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs text-slate-500 mb-1 ml-1">Model</label>
            <select 
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!filters.manufacturer}
              value={filters.model}
              onChange={(e) => onFilterChange({ model: e.target.value })}
            >
              <option value="">Select Model</option>
              {filters.manufacturer && MODELS_BY_MAKE[filters.manufacturer]?.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs text-slate-500 mb-1 ml-1">Year</label>
            <select 
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-2 focus:ring-blue-500"
              value={filters.year}
              onChange={(e) => onFilterChange({ year: e.target.value })}
            >
              <option value="">Any Year</option>
              {Array.from({length: 30}, (_, i) => 2025 - i).map(y => (
                <option key={y} value={y.toString()}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Performance Level */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider flex items-center">
            <Rocket className="h-4 w-4 mr-2 text-amber-500" />
            Performance
          </h3>
          <div className="space-y-2">
            {PERFORMANCE_LEVELS.map(level => (
              <label key={level} className="flex items-center text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 mr-3 border-slate-300 focus:ring-blue-500"
                  checked={filters.performance.includes(level)}
                  onChange={() => {
                    const newLevels = filters.performance.includes(level)
                      ? filters.performance.filter(l => l !== level)
                      : [...filters.performance, level];
                    onFilterChange({ performance: newLevels });
                  }}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 mr-3 border-slate-300 focus:ring-blue-500"
                  checked={filters.categories.includes(cat)}
                  onChange={() => {
                    const newCats = filters.categories.includes(cat)
                      ? filters.categories.filter(c => c !== cat)
                      : [...filters.categories, cat];
                    onFilterChange({ categories: newCats });
                  }}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Max Price</h3>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="10"
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({ priceRange: [0, parseInt(e.target.value)] })}
          />
          <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
            <span>$0</span>
            <span>Up to ${filters.priceRange[1]}</span>
          </div>
        </div>

        <button 
          onClick={() => {}} // Could trigger explicit search if needed
          className="w-full mt-8 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Update Results
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
