import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import IdeaForm from '../components/IdeaForm';
import { TradingIdea } from '../types';

const CreateIdea: React.FC = () => {
  const { addIdea } = useAppContext();
  const navigate = useNavigate();
  
  const handleSubmit = (data: Omit<TradingIdea, 'id' | 'createdAt' | 'updatedAt'>) => {
    addIdea(data);
    navigate('/ideas');
  };
  
  return (
    <div className="container px-4 mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Investment Idea</h1>
      </div>
      
      <IdeaForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateIdea;