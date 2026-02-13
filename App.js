
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Header } from './components/Header.js';
import { GameCard } from './components/GameCard.js';
import { GamePlayer } from './components/GamePlayer.js';
import { Flame, Trophy, Ghost, Zap } from 'lucide-react';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Strategy', 'Retro'];

const GameGridPage = ({ searchTerm, favorites, toggleFavorite, onlyFavorites, games }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesFavorites = !onlyFavorites || favorites.includes(game.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [searchTerm, activeCategory, favorites, onlyFavorites, games]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!onlyFavorites && !searchTerm && activeCategory === 'All' && (
        <section className="mb-12 relative overflow-hidden rounded-[2rem] bg-indigo-600 p-8 sm:p-12 shadow-2xl shadow-indigo-500/20">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-orbitron text-4xl sm:text-6xl font-black text-white mb-6 leading-[1.1]">
              The Hub for <br />
              <span className="text-indigo-950">Unblocked Fun.</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-md">
              A curated collection of lag-free games. No accounts, no trackers, just pure gameplay.
            </p>
          </div>
        </section>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
          {onlyFavorites ? 'My Favorites' : 'Explore Games'}
        </h2>

        {!onlyFavorites && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            isFavorite={favorites.includes(game.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [games, setGames] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('./games.json')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("Could not load games", err));

    const stored = localStorage.getItem('nova_favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetId = id;
    setFavorites(prev => {
      const next = prev.includes(targetId) 
        ? prev.filter(fid => fid !== targetId) 
        : [...prev, targetId];
      localStorage.setItem('nova_favorites', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header onSearch={setSearchTerm} favoritesCount={favorites.length} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<GameGridPage searchTerm={searchTerm} favorites={favorites} toggleFavorite={toggleFavorite} games={games} />} />
          <Route path="/favorites" element={<GameGridPage searchTerm={searchTerm} favorites={favorites} toggleFavorite={toggleFavorite} games={games} onlyFavorites />} />
          <Route path="/play/:id" element={<GamePlayerWrapper games={games} favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

const GamePlayerWrapper = ({ games, favorites, toggleFavorite }) => {
  const { id } = useParams();
  const game = games.find(g => g.id === id);
  if (!game) return <div>Loading...</div>;
  return <GamePlayer game={game} isFavorite={favorites.includes(game.id)} toggleFavorite={(id) => toggleFavorite(null, id)} />;
};
