
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { GAMES_DATA } from './data/games';
import { Category, Game } from './types';
import { Flame, Trophy, Ghost, Zap } from 'lucide-react';

const CATEGORIES: Category[] = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Strategy', 'Retro'];

const GameGridPage: React.FC<{ 
  searchTerm: string, 
  favorites: string[], 
  toggleFavorite: (e: React.MouseEvent, id: string) => void,
  onlyFavorites?: boolean
}> = ({ searchTerm, favorites, toggleFavorite, onlyFavorites }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesFavorites = !onlyFavorites || favorites.includes(game.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [searchTerm, activeCategory, favorites, onlyFavorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      {/* Hero Section (Only on Home) */}
      {!onlyFavorites && !searchTerm && (
        <section className="mb-12 relative overflow-hidden rounded-[2rem] bg-indigo-600 p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-200 font-bold tracking-widest text-xs uppercase mb-4">
              <Zap className="w-4 h-4 fill-current" />
              New Release
            </div>
            <h1 className="font-orbitron text-4xl sm:text-6xl font-black text-white mb-6 leading-[1.1]">
              Level Up Your <br />
              <span className="text-indigo-950">Free Time.</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-md">
              High-quality, lag-free games available anywhere. No downloads, no blocked proxies, just pure fun.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all hover:scale-105">
                Play Featured
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Abstract background blobs */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-white/10 to-transparent -skew-x-12 translate-x-1/4" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        </section>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          {onlyFavorites ? (
            <>
              <Flame className="w-6 h-6 text-red-500" />
              Your Favorite Games
            </>
          ) : (
            <>
              <Trophy className="w-6 h-6 text-amber-500" />
              {activeCategory === 'All' ? 'Discover All Games' : `${activeCategory} Games`}
            </>
          )}
        </h2>

        {/* Categories Scroller */}
        {!onlyFavorites && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredGames.length > 0 ? (
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
      ) : (
        <div className="text-center py-24 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
          <div className="inline-flex p-4 bg-slate-800 rounded-2xl mb-4">
            <Ghost className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">No games found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

const GamePlayerWrapper: React.FC<{
  favorites: string[],
  toggleFavorite: (id: string) => void
}> = ({ favorites, toggleFavorite }) => {
  const { id } = useParams<{ id: string }>();
  const game = GAMES_DATA.find(g => g.id === id);

  if (!game) return <Navigate to="/" />;

  return (
    <GamePlayer 
      game={game} 
      isFavorite={favorites.includes(game.id)} 
      toggleFavorite={toggleFavorite} 
    />
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const location = useLocation();

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('nova_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent | string, id: string | null = null) => {
    // Overload: can accept event or just string id
    const targetId = typeof e === 'string' ? e : id!;
    if (typeof e !== 'string') e.preventDefault();

    setFavorites(prev => {
      const next = prev.includes(targetId) 
        ? prev.filter(fid => fid !== targetId) 
        : [...prev, targetId];
      localStorage.setItem('nova_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchTerm} favoritesCount={favorites.length} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <GameGridPage 
              searchTerm={searchTerm} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          } />
          <Route path="/favorites" element={
            <GameGridPage 
              searchTerm={searchTerm} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite}
              onlyFavorites
            />
          } />
          <Route path="/play/:id" element={
            <GamePlayerWrapper 
              favorites={favorites} 
              toggleFavorite={(id) => toggleFavorite(id, id)} 
            />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-orbitron text-lg font-bold">
                NOVA<span className="text-indigo-500">ARCADE</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
              The premium destination for unblocked browser entertainment. Powered by modern web technology.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-200">Navigation</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-indigo-400">Home</a></li>
                <li><a href="#" className="hover:text-indigo-400">Featured</a></li>
                <li><a href="#" className="hover:text-indigo-400">Popular</a></li>
                <li><a href="#" className="hover:text-indigo-400">New Games</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-200">Support</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-indigo-400">Report Issue</a></li>
                <li><a href="#" className="hover:text-indigo-400">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-xs italic">
            &copy; {new Date().getFullYear()} NovaArcade. This is a demo platform for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}
