import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { TrendingUp, ListChecks, PiggyBank, Layers, Plus } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import CategoryDistribution from '../components/Dashboard/CategoryDistribution';
import RecentIdeas from '../components/Dashboard/RecentIdeas';

const Dashboard: React.FC = () => {
  const { state: { ideas } } = useAppContext();
  
  // Calculate stats
  const totalIdeas = ideas.length;
  const stockCount = ideas.filter(idea => idea.category === 'stock').length;
  const sectorCount = ideas.filter(idea => idea.category === 'sector').length;
  
  // Calculate how many ideas are below target price
  const belowTargetCount = ideas.filter(idea => 
    idea.currentPrice !== undefined && 
    idea.targetBuyPrice !== undefined && 
    idea.currentPrice <= idea.targetBuyPrice
  ).length;
  
  const belowTargetPercentage = totalIdeas > 0 
    ? Math.round((belowTargetCount / totalIdeas) * 100) 
    : 0;
  
  return (
    <div className="container px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Dashboard</h1>
        <Link
          to="/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-2" />
          New Idea
        </Link>
      </div>
      
      {totalIdeas === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Welcome to Your Investment Tracker</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start building your investment portfolio by adding your first trading idea.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={16} className="mr-2" />
            Add Your First Idea
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Total Ideas" 
              value={totalIdeas} 
              icon={<ListChecks size={24} />} 
            />
            <StatsCard 
              title="Stock Ideas" 
              value={stockCount} 
              icon={<TrendingUp size={24} />} 
            />
            <StatsCard 
              title="Sector Analysis" 
              value={sectorCount} 
              icon={<Layers size={24} />} 
            />
            <StatsCard 
              title="Below Target" 
              value={`${belowTargetCount} (${belowTargetPercentage}%)`} 
              icon={<PiggyBank size={24} />} 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentIdeas ideas={ideas} />
            </div>
            <div>
              <CategoryDistribution ideas={ideas} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;