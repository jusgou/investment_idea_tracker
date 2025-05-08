import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import IdeaCard from '../components/IdeaCard';
import Filters from '../components/Filters';

const IdeasList: React.FC = () => {
  const { 
    filteredIdeas, 
    deleteIdea, 
    state: { filters }, 
    setFilterCategory,
    setSearchTerm,
    setFilterTags,
    clearFilters,
    getAllTags
  } = useAppContext();
  
  return (
    <div className="container px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Ideas</h1>
        <Link
          to="/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-2" />
          New Idea
        </Link>
      </div>
      
      <Filters
        categoryFilter={filters.category}
        onCategoryChange={setFilterCategory}
        searchTerm={filters.searchTerm}
        onSearchChange={setSearchTerm}
        tags={filters.tags}
        availableTags={getAllTags()}
        onTagsChange={setFilterTags}
        onClearFilters={clearFilters}
      />
      
      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              onDelete={deleteIdea}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No ideas found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {filters.category !== 'all' || filters.searchTerm || filters.tags.length > 0
              ? "Try adjusting your filters to see more results."
              : "Start by adding your first investment idea."}
          </p>
          {filters.category === 'all' && !filters.searchTerm && filters.tags.length === 0 && (
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={16} className="mr-2" />
              Add Your First Idea
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default IdeasList;