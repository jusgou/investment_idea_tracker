import React from 'react';
import { TradingIdea, IdeaCategory } from '../../types';

interface CategoryDistributionProps {
  ideas: TradingIdea[];
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ ideas }) => {
  const categoryCounts: Record<IdeaCategory, number> = {
    stock: 0,
    sector: 0,
    etf: 0,
    crypto: 0,
    other: 0,
  };
  
  ideas.forEach(idea => {
    categoryCounts[idea.category]++;
  });
  
  const totalIdeas = ideas.length;
  
  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'stock': return 'bg-blue-500 dark:bg-blue-600';
      case 'sector': return 'bg-purple-500 dark:bg-purple-600';
      case 'etf': return 'bg-green-500 dark:bg-green-600';
      case 'crypto': return 'bg-orange-500 dark:bg-orange-600';
      default: return 'bg-gray-500 dark:bg-gray-600';
    }
  };
  
  const getCategoryLabel = (category: string): string => {
    switch(category) {
      case 'stock': return 'Stocks';
      case 'sector': return 'Sectors';
      case 'etf': return 'ETFs';
      case 'crypto': return 'Crypto';
      default: return 'Other';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-5 border border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Category Distribution</h3>
      
      {totalIdeas > 0 ? (
        <div className="space-y-4">
          {(Object.keys(categoryCounts) as IdeaCategory[]).map((category) => {
            const count = categoryCounts[category];
            if (count === 0) return null;
            
            const percentage = Math.round((count / totalIdeas) * 100);
            
            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{getCategoryLabel(category)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{count} ({percentage}%)</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`${getCategoryColor(category)} h-2.5 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No ideas added yet</p>
      )}
    </div>
  );
};

export default CategoryDistribution;