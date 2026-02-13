
import React, { useState, useRef } from 'react';
import { Maximize2, RotateCcw, ArrowLeft, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, isFavorite, toggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="p-1.5 bg-slate-800 rounded-lg group-hover:bg-slate-700">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Games</span>
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toggleFavorite(game.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isFavorite 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      {/* Main Player Area */}
      <div className="relative group">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
          {/* Iframe */}
          <div className="relative aspect-video w-full bg-slate-950">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
                <p className="text-slate-400 font-medium animate-pulse">Loading {game.title}...</p>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={game.iframeUrl}
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
              allow="fullscreen; autoplay; encrypted-media"
              title={game.title}
            />
          </div>

          {/* Controls Bar */}
          <div className="bg-slate-800/80 backdrop-blur-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden hidden sm:block">
                <img src={game.thumbnail} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h2 className="font-bold text-slate-100 leading-tight">{game.title}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-indigo-400 font-semibold">{game.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">Verified Secure</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRefresh}
                className="p-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-all"
                title="Refresh Game"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-all"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button className="hidden sm:block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all ml-2">
                Play in New Tab
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Info Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              About This Game
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {game.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Browser Game', 'Unblocked', 'Free to Play', game.category].map(tag => (
                <span key={tag} className="bg-slate-700/50 text-slate-400 px-3 py-1 rounded-lg text-xs font-medium">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
            <h3 className="font-bold text-indigo-400 mb-2">Arcade Pro-Tip</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Use <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-100 text-[10px]">F</kbd> for Fullscreen mode or click the expand icon in the controller bar for the best experience.
            </p>
          </div>
          
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl">
            <h3 className="font-bold text-slate-200 mb-4">Popular Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-700/50 text-sm text-slate-400 hover:text-slate-100 transition-all flex items-center justify-between">
                <span>Report Issue</span>
                <span className="text-[10px] opacity-50">v1.2.0</span>
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-700/50 text-sm text-slate-400 hover:text-slate-100 transition-all flex items-center justify-between">
                <span>View Source</span>
                <span className="text-[10px] opacity-50">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
