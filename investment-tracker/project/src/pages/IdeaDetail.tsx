import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Edit, Trash2, Tag } from 'lucide-react';

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: { ideas }, deleteIdea } = useAppContext();
  
  const idea = useMemo(() => ideas.find(idea => idea.id === id), [ideas, id]);
  
  if (!idea) {
    return (
      <div className="container px-4 mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Idea Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The investment idea you're looking for does not exist.</p>
        <Link
          to="/ideas"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Ideas
        </Link>
      </div>
    );
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
  
  const getPriceStatusColor = () => {
    if (!idea.currentPrice || !idea.targetBuyPrice) return '';
    
    return idea.currentPrice <= idea.targetBuyPrice 
      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-100 dark:border-green-900/30'
      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-100 dark:border-red-900/30';
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
      deleteIdea(idea.id);
      navigate('/ideas');
    }
  };
  
  return (
    <div className="container px-4 mx-auto max-w-4xl">
      <div className="mb-6 flex items-center">
        <Link
          to="/ideas"
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Ideas
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{idea.title}</h1>
            </div>
            
            <div className="flex space-x-2">
              <Link
                to={`/edit/${idea.id}`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Edit size={16} className="mr-1.5" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 size={16} className="mr-1.5" />
                Delete
              </button>
            </div>
          </div>
          
          {(idea.targetBuyPrice || idea.currentPrice) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {idea.targetBuyPrice && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Target Buy Price</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">${idea.targetBuyPrice.toFixed(2)}</p>
                </div>
              )}
              
              {idea.currentPrice && (
                <div className={`p-4 rounded-lg border ${getPriceStatusColor()}`}>
                  <p className="text-sm font-medium mb-1">Current Price</p>
                  <p className="text-2xl font-semibold">${idea.currentPrice.toFixed(2)}</p>
                  {idea.targetBuyPrice && (
                    <p className="text-sm mt-1">
                      {idea.currentPrice <= idea.targetBuyPrice 
                        ? '✓ Below target price - potential buy opportunity'
                        : `${((idea.currentPrice / idea.targetBuyPrice - 1) * 100).toFixed(1)}% above target price`
                      }
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Notes & Research</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              {idea.notes ? (
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  {idea.notes.split('\n').map((paragraph, index) => (
                    paragraph ? <p key={index} className="mb-4 last:mb-0 text-gray-700 dark:text-gray-300">{paragraph}</p> : <br key={index} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No notes added</p>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {idea.tags.length > 0 ? (
                idea.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900 px-3 py-0.5 text-sm font-medium text-indigo-800 dark:text-indigo-200"
                  >
                    <Tag size={14} className="mr-1.5" />
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No tags added</p>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>Created: {formatDate(idea.createdAt)}</div>
              {idea.updatedAt !== idea.createdAt && (
                <div>Last updated: {formatDate(idea.updatedAt)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;