
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, PlayCircle } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent, id: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, toggleFavorite }) => {
  return (
    <Link 
      to={`/play/${game.id}`}
      className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 block"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="w-12 h-12 text-white fill-indigo-600 drop-shadow-xl" />
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => toggleFavorite(e, game.id)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-slate-900/50 text-slate-300 hover:bg-slate-900/80 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {game.category}
          </span>
          {game.featured && (
            <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-semibold">{game.rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 line-clamp-1">
          {game.description}
        </p>
      </div>
    </Link>
  );
};
