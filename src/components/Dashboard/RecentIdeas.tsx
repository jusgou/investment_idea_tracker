import React from 'react';
import { TradingIdea } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface RecentIdeasProps {
  ideas: TradingIdea[];
}

const RecentIdeas: React.FC<RecentIdeasProps> = ({ ideas }) => {
  const navigate = useNavigate();
  
  // Sort ideas by creation date (newest first) and take the most recent 5
  const recentIdeas = [...ideas]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'stock': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sector': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'etf': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'crypto': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-5 border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Ideas</h3>
        <button 
          onClick={() => navigate('/ideas')}
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          View all <ArrowUpRight size={14} className="ml-1" />
        </button>
      </div>
      
      {recentIdeas.length > 0 ? (
        <div className="space-y-3">
          {recentIdeas.map((idea) => (
            <div 
              key={idea.id}
              onClick={() => navigate(`/ideas/${idea.id}`)}
              className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors duration-200"
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getCategoryColor(idea.category)}`}>
                    {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
                  </span>
                  {idea.symbol && (
                    <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                      {idea.symbol.toUpperCase()}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{idea.title}</h4>
                {idea.targetBuyPrice && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Target: ${idea.targetBuyPrice.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatDate(idea.createdAt)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No ideas added yet</p>
      )}
      
      {recentIdeas.length > 0 && recentIdeas.length < 5 && (
        <button
          onClick={() => navigate('/create')}
          className="mt-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Add New Idea
        </button>
      )}
    </div>
  );
};

export default RecentIdeas;