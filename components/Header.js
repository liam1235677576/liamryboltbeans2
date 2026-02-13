
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Search, Heart } from 'lucide-react';

export const Header = ({ onSearch, favoritesCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg"><Gamepad2 className="w-6 h-6 text-white" /></div>
          <span className="font-orbitron text-xl font-bold tracking-tighter">NOVAARCADE</span>
        </Link>
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search games..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 text-white"
          />
        </div>
        <Link to="/favorites" className="p-2 relative">
          <Heart className="w-6 h-6 text-slate-300" />
          {favoritesCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{favoritesCount}</span>}
        </Link>
      </div>
    </header>
  );
};
