
export type Category = 'All' | 'Action' | 'Puzzle' | 'Sports' | 'Arcade' | 'Strategy' | 'Retro';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: Category;
  rating: number;
  featured?: boolean;
}

export interface UserState {
  favorites: string[];
}
