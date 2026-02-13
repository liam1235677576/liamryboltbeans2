
import React, { useState, useRef } from 'react';
import { Maximize2, RotateCcw, ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GamePlayer = ({ game, isFavorite, toggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <button onClick={() => toggleFavorite(game.id)} className={`px-4 py-2 rounded-xl text-sm ${isFavorite ? 'text-red-500 bg-red-500/10' : 'bg-slate-800 text-slate-300'}`}>
          <Heart className={`w-4 h-4 inline mr-2 ${isFavorite ? 'fill-current' : ''}`} />
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
      </div>
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="relative aspect-video w-full bg-slate-950">
          {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-slate-900">Loading...</div>}
          <iframe
            ref={iframeRef}
            src={game.iframeUrl}
            className="w-full h-full border-none"
            onLoad={() => setIsLoading(false)}
            allow="fullscreen; autoplay; encrypted-media"
          />
        </div>
        <div className="bg-slate-800/80 p-4 flex items-center justify-between">
          <h2 className="font-bold text-slate-100">{game.title}</h2>
          <div className="flex gap-2">
            <button onClick={() => iframeRef.current.src = iframeRef.current.src}><RotateCcw className="w-5 h-5" /></button>
            <button onClick={() => iframeRef.current.requestFullscreen()}><Maximize2 className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
