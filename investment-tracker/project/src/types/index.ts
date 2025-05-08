export type IdeaCategory = 'stock' | 'sector' | 'etf' | 'crypto' | 'other';

export interface TradingIdea {
  id: string;
  title: string;
  category: IdeaCategory;
  symbol?: string;
  targetBuyPrice?: number;
  currentPrice?: number;
  notes: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface AppState {
  ideas: TradingIdea[];
  filters: {
    category: IdeaCategory | 'all';
    searchTerm: string;
    tags: string[];
  };
}