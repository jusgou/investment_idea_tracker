import React, { useState } from 'react';
import { IdeaCategory } from '../types';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
  categoryFilter: IdeaCategory | 'all';
  onCategoryChange: (category: IdeaCategory | 'all') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  tags: string[];
  availableTags: string[];
  onTagsChange: (tags: string[]) => void;
  onClearFilters: () => void;
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'stock', label: 'Stocks' },
  { value: 'sector', label: 'Sectors' },
  { value: 'etf', label: 'ETFs' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'other', label: 'Other' },
];

const Filters: React.FC<FiltersProps> = ({
  categoryFilter,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  tags,
  availableTags,
  onTagsChange,
  onClearFilters,
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  
  const hasActiveFilters = categoryFilter !== 'all' || searchTerm !== '' || tags.length > 0;
  
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
    setSelectedTag('');
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };
  
  const filteredAvailableTags = availableTags
    .filter(tag => !tags.includes(tag))
    .sort();
  
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-4 mb-6 border border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
        <div className="flex space-x-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="p-1.5 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className={`mt-3 space-y-3 ${isFiltersExpanded ? '' : 'hidden md:block'}`}>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value as IdeaCategory | 'all')}
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            >
              {CATEGORY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-2/3">
            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search-filter"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, symbol or notes..."
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:text-indigo-200"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          
          {filteredAvailableTags.length > 0 && (
            <div className="flex">
              <select
                id="tag-filter"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="flex-grow rounded-l-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select a tag</option>
                {filteredAvailableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleAddTag(selectedTag)}
                disabled={!selectedTag}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;