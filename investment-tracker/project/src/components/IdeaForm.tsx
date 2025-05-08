import React, { useState, useEffect } from 'react';
import { TradingIdea, IdeaCategory } from '../types';
import { X, Plus } from 'lucide-react';

interface IdeaFormProps {
  initialData?: Partial<TradingIdea>;
  onSubmit: (data: Omit<TradingIdea, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isEditing?: boolean;
}

const CATEGORY_OPTIONS: { value: IdeaCategory; label: string }[] = [
  { value: 'stock', label: 'Individual Stock' },
  { value: 'sector', label: 'Market Sector' },
  { value: 'etf', label: 'ETF' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'other', label: 'Other' },
];

const IdeaForm: React.FC<IdeaFormProps> = ({ 
  initialData = {}, 
  onSubmit, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [category, setCategory] = useState<IdeaCategory>(initialData.category || 'stock');
  const [symbol, setSymbol] = useState(initialData.symbol || '');
  const [targetBuyPrice, setTargetBuyPrice] = useState<string>(
    initialData.targetBuyPrice ? initialData.targetBuyPrice.toString() : ''
  );
  const [currentPrice, setCurrentPrice] = useState<string>(
    initialData.currentPrice ? initialData.currentPrice.toString() : ''
  );
  const [notes, setNotes] = useState(initialData.notes || '');
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (targetBuyPrice && isNaN(Number(targetBuyPrice))) {
      newErrors.targetBuyPrice = 'Must be a valid number';
    }
    
    if (currentPrice && isNaN(Number(currentPrice))) {
      newErrors.currentPrice = 'Must be a valid number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      title,
      category,
      symbol: symbol.trim() || undefined,
      targetBuyPrice: targetBuyPrice ? Number(targetBuyPrice) : undefined,
      currentPrice: currentPrice ? Number(currentPrice) : undefined,
      notes,
      tags,
    });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title*
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white ${
              errors.title ? 'border-red-500 dark:border-red-500' : ''
            }`}
            placeholder="E.g., Long-term investment in renewable energy"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category*
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as IdeaCategory)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Symbol/Ticker
            </label>
            <input
              type="text"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white uppercase"
              placeholder="E.g., AAPL, SPY"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="targetBuyPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Buy Price ($)
            </label>
            <input
              type="text"
              id="targetBuyPrice"
              value={targetBuyPrice}
              onChange={(e) => setTargetBuyPrice(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white ${
                errors.targetBuyPrice ? 'border-red-500 dark:border-red-500' : ''
              }`}
              placeholder="E.g., 150.50"
            />
            {errors.targetBuyPrice && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.targetBuyPrice}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Price ($)
            </label>
            <input
              type="text"
              id="currentPrice"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white ${
                errors.currentPrice ? 'border-red-500 dark:border-red-500' : ''
              }`}
              placeholder="E.g., 155.75"
            />
            {errors.currentPrice && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentPrice}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Notes & Research
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            placeholder="Add your research, analysis, and notes about this investment idea..."
          />
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  onClick={() => removeTag(tag)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              id="newTag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-grow rounded-l-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              placeholder="Add tags (e.g., tech, dividend, growth)"
            />
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Press Enter or click the plus button to add a tag
          </p>
        </div>
        
        <div className="flex justify-end space-x-3 pt-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isEditing ? 'Update Idea' : 'Save Idea'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default IdeaForm;