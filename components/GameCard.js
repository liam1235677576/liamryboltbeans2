
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

export const GameCard = ({ game, isFavorite, toggleFavorite }) => {
  return (
    <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all">
      <Link to={`/play/${game.id}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-slate-100 mb-1">{game.title}</h3>
          <p className="text-xs text-slate-400 truncate">{game.description}</p>
        </div>
      </Link>
      <button
        onClick={(e) => toggleFavorite(e, game.id)}
        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-slate-900/50 text-slate-300'}`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};
