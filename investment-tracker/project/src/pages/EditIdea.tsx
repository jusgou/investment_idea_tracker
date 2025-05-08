import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import IdeaForm from '../components/IdeaForm';
import { TradingIdea } from '../types';

const EditIdea: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: { ideas }, updateIdea } = useAppContext();
  
  const idea = useMemo(() => ideas.find(idea => idea.id === id), [ideas, id]);
  
  const handleSubmit = (data: Omit<TradingIdea, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!idea) return;
    
    updateIdea({
      ...data,
      id: idea.id,
      createdAt: idea.createdAt,
      updatedAt: Date.now(),
    });
    
    navigate(`/ideas/${idea.id}`);
  };
  
  if (!idea) {
    return (
      <div className="container px-4 mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Idea Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The investment idea you're trying to edit does not exist.</p>
        <button
          onClick={() => navigate('/ideas')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Ideas
        </button>
      </div>
    );
  }
  
  return (
    <div className="container px-4 mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Investment Idea</h1>
      </div>
      
      <IdeaForm 
        initialData={idea}
        onSubmit={handleSubmit}
        isEditing
      />
    </div>
  );
};

export default EditIdea;