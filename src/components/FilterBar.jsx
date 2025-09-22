import React from 'react';
import { Search, MapPin, BarChart3 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.js';

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedArea, 
  setSelectedArea, 
  sortBy, 
  setSortBy, 
  areas 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      {/* Mobile-First Search Bar */}
      <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 font-poppins text-text-primary placeholder-gray-500"
              />
            </div>
      </div>

      {/* Mobile-First Filter Row */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 font-poppins text-text-primary text-sm"
          >
            <option value="">{t('allAreas')}</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 relative">
          <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 font-poppins text-text-primary text-sm"
          >
            <option value="votes-desc">{t('mostPopular')}</option>
            <option value="votes-asc">{t('leastPopular')}</option>
            <option value="name-asc">{t('nameAZ')}</option>
            <option value="name-desc">{t('nameZA')}</option>
          </select>
        </div>
      </div>

      {/* Mobile Active Filters */}
      {(searchTerm || selectedArea) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-medium bg-amber-600 text-white shadow-sm">
              <Search className="w-3 h-3 mr-1" />
              "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
              >
                ✕
              </button>
            </span>
          )}
          {selectedArea && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-medium bg-gray-600 text-white shadow-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {selectedArea}
              <button
                onClick={() => setSelectedArea('')}
                className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
