import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradingIdea } from '../types';
import { Edit, Trash2, ArrowUpRight, Tag } from 'lucide-react';

interface IdeaCardProps {
  idea: TradingIdea;
  onDelete: (id: string) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onDelete }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const navigate = useNavigate();
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'stock': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sector': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'etf': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'crypto': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  const getPriceStatusColor = () => {
    if (!idea.currentPrice || !idea.targetBuyPrice) return '';
    
    return idea.currentPrice <= idea.targetBuyPrice 
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getCategoryColor(idea.category)}`}>
                {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
              </span>
              {idea.symbol && (
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  {idea.symbol.toUpperCase()}
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{idea.title}</h3>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => navigate(`/edit/${idea.id}`)}
              className="p-1.5 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Edit idea"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => setIsConfirmingDelete(true)}
              className="p-1.5 rounded-full text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Delete idea"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {(idea.targetBuyPrice || idea.currentPrice) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {idea.targetBuyPrice && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Target Buy: </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">${idea.targetBuyPrice.toFixed(2)}</span>
              </div>
            )}
            {idea.currentPrice && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Current: </span>
                <span className={`font-medium ${getPriceStatusColor()}`}>${idea.currentPrice.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {idea.notes}
        </p>
        
        {idea.tags.length > 0 && (
          <div className="mt-3 flex items-center flex-wrap gap-1.5">
            <Tag size={14} className="text-gray-400" />
            {idea.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div>Added: {formatDate(idea.createdAt)}</div>
          <button 
            onClick={() => navigate(`/ideas/${idea.id}`)}
            className="flex items-center font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            View Details <ArrowUpRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Delete confirmation */}
      {isConfirmingDelete && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-900/30">
          <p className="text-sm text-red-800 dark:text-red-200 mb-2">Are you sure you want to delete this idea?</p>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsConfirmingDelete(false)}
              className="px-3 py-1 text-xs font-medium rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onDelete(idea.id);
                setIsConfirmingDelete(false);
              }}
              className="px-3 py-1 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaCard;