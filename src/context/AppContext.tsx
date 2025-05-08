import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, TradingIdea, IdeaCategory } from '../types';

type AppAction = 
  | { type: 'ADD_IDEA'; payload: TradingIdea }
  | { type: 'UPDATE_IDEA'; payload: TradingIdea }
  | { type: 'DELETE_IDEA'; payload: string }
  | { type: 'SET_FILTER_CATEGORY'; payload: IdeaCategory | 'all' }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTER_TAGS'; payload: string[] }
  | { type: 'CLEAR_FILTERS' };

const initialState: AppState = {
  ideas: [],
  filters: {
    category: 'all',
    searchTerm: '',
    tags: [],
  },
};

const loadLocalStorage = (): AppState => {
  try {
    const savedState = localStorage.getItem('tradingIdeasState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return initialState;
  }
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  let newState: AppState;
  
  switch (action.type) {
    case 'ADD_IDEA':
      newState = {
        ...state,
        ideas: [...state.ideas, action.payload],
      };
      break;
      
    case 'UPDATE_IDEA':
      newState = {
        ...state,
        ideas: state.ideas.map(idea => 
          idea.id === action.payload.id ? action.payload : idea
        ),
      };
      break;
      
    case 'DELETE_IDEA':
      newState = {
        ...state,
        ideas: state.ideas.filter(idea => idea.id !== action.payload),
      };
      break;
      
    case 'SET_FILTER_CATEGORY':
      newState = {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload,
        },
      };
      break;
      
    case 'SET_SEARCH_TERM':
      newState = {
        ...state,
        filters: {
          ...state.filters,
          searchTerm: action.payload,
        },
      };
      break;
      
    case 'SET_FILTER_TAGS':
      newState = {
        ...state,
        filters: {
          ...state.filters,
          tags: action.payload,
        },
      };
      break;
      
    case 'CLEAR_FILTERS':
      newState = {
        ...state,
        filters: {
          category: 'all',
          searchTerm: '',
          tags: [],
        },
      };
      break;
      
    default:
      return state;
  }
  
  // Save to localStorage
  localStorage.setItem('tradingIdeasState', JSON.stringify(newState));
  return newState;
};

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addIdea: (idea: Omit<TradingIdea, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIdea: (idea: TradingIdea) => void;
  deleteIdea: (id: string) => void;
  setFilterCategory: (category: IdeaCategory | 'all') => void;
  setSearchTerm: (term: string) => void;
  setFilterTags: (tags: string[]) => void;
  clearFilters: () => void;
  filteredIdeas: TradingIdea[];
  getAllTags: () => string[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, loadLocalStorage);
  
  // Calculate filtered ideas based on current filters
  const filteredIdeas = state.ideas.filter(idea => {
    // Filter by category
    if (state.filters.category !== 'all' && idea.category !== state.filters.category) {
      return false;
    }
    
    // Filter by search term
    if (state.filters.searchTerm && 
        !idea.title.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) &&
        !idea.notes.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) &&
        !(idea.symbol && idea.symbol.toLowerCase().includes(state.filters.searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Filter by tags
    if (state.filters.tags.length > 0 && 
        !state.filters.tags.some(tag => idea.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });
  
  const addIdea = (idea: Omit<TradingIdea, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newIdea: TradingIdea = {
      ...idea,
      id: `idea_${now}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    dispatch({ type: 'ADD_IDEA', payload: newIdea });
  };
  
  const updateIdea = (idea: TradingIdea) => {
    dispatch({ 
      type: 'UPDATE_IDEA', 
      payload: { ...idea, updatedAt: Date.now() }
    });
  };
  
  const deleteIdea = (id: string) => {
    dispatch({ type: 'DELETE_IDEA', payload: id });
  };
  
  const setFilterCategory = (category: IdeaCategory | 'all') => {
    dispatch({ type: 'SET_FILTER_CATEGORY', payload: category });
  };
  
  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };
  
  const setFilterTags = (tags: string[]) => {
    dispatch({ type: 'SET_FILTER_TAGS', payload: tags });
  };
  
  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };
  
  const getAllTags = (): string[] => {
    const allTags = new Set<string>();
    state.ideas.forEach(idea => {
      idea.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  };
  
  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem('tradingIdeasState', JSON.stringify(state));
  }, [state]);
  
  return (
    <AppContext.Provider 
      value={{
        state,
        dispatch,
        addIdea,
        updateIdea,
        deleteIdea,
        setFilterCategory,
        setSearchTerm,
        setFilterTags,
        clearFilters,
        filteredIdeas,
        getAllTags
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};