import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import { 
  Search, Heart, Maximize2, ArrowLeft, Play, Gamepad2, RefreshCw
} from 'lucide-react';

const FALLBACK_GAMES = [
  {
    "id": "moto-x3m",
    "title": "Moto X3M",
    "description": "Perform insane flips and dodge deadly obstacles in the ultimate bike racing game.",
    "iframeUrl": "https://script.google.com/macros/s/AKfycbw7_zG02ZMXnPSdwCx0CcmN8eX_0Bk3715TSP-Eglb1DyVhp7RxShuXq4qJ8Q2s7cnW/exec",
    "category": "Racing"
  },
  {
    "id": "cluster-rush",
    "title": "Cluster Rush",
    "description": "Jump from truck to truck in this high-speed, heart-pounding arcade runner.",
    "iframeUrl": "https://ubg66.gitlab.io/cluster-rush/",
    "category": "Action"
  },
  {
    "id": "friday-night-funkin",
    "title": "Friday Night Funkin'",
    "description": "A rhythm game where you battle opponents in musical duels.",
    "iframeUrl": "https://ubg66.gitlab.io/fnf-classic/",
    "category": "Music"
  },
  {
    "id": "geometry-dash",
    "title": "Geometry Dash",
    "description": "Jump and fly your way through danger in this rhythm-based action platformer.",
    "iframeUrl": "https://ubg66.gitlab.io/geometry-dash/",
    "category": "Arcade"
  },
  {
    "id": "hollow-knight",
    "title": "Hollow Knight",
    "description": "Forge your own path! An epic action adventure through a vast ruined kingdom.",
    "iframeUrl": "https://db.art.fullsusmtb.org/html/hollow_knight/index.html",
    "category": "Action"
  },
  {
    "id": "basketball-legends-2020",
    "title": "Basketball Legends 2020",
    "description": "Play as legendary basketball stars in this high-energy sports game.",
    "iframeUrl": "https://script.google.com/macros/s/AKfycbwE6Cy_4gnECeA-6JH6xldzGnFQlBC9xPqS1Jlru8kF2Wr4LMshHeNa2jEJjM5cYfz4Pw/exec",
    "category": "Sports"
  },
  {
    "id": "retro-bowl",
    "title": "Retro Bowl",
    "description": "The ultimate retro-style American football experience.",
    "iframeUrl": "https://game316009.konggames.com/gamez/0031/6009/live/index.html",
    "category": "Sports"
  },
  {
    "id": "slope",
    "title": "Slope",
    "description": "A high-speed 3D running game. Control a ball rolling down a steep slope.",
    "iframeUrl": "https://kdata1.com/2020/05/slope/",
    "category": "Action"
  },
  {
    "id": "angry-birds",
    "title": "Angry Birds",
    "description": "Classic bird slinging action.",
    "iframeUrl": "https://script.google.com/macros/s/AKfycby30nrhMSPeJyfgpPQfLsVVhOxjjyErkIsQtoYAzPkRYenYcSBpVyMcOwXy_flMCjFm/exec",
    "category": "Puzzle"
  },
  {
    "id": "burrito-bison",
    "title": "Burrito Bison",
    "description": "Launch Burrito Bison through the air!",
    "iframeUrl": "https://ubg66.gitlab.io/burrito-bison/",
    "category": "Action"
  },
  {
    "id": "jetpack-joyride",
    "title": "Jetpack Joyride",
    "description": "Fly high with a machine gun jetpack! Dodge obstacles and collect coins.",
    "iframeUrl": "https://ubg66.gitlab.io/jetpack-joyride-browser/",
    "category": "Action"
  },
  {
    "id": "eggy-car",
    "title": "Eggy Car",
    "description": "Drive a car with an egg! Master the physics and keep the egg safe.",
    "iframeUrl": "https://ubg66.gitlab.io/eggy-car/",
    "category": "Racing"
  },
  {
    "id": "tunnel-rush",
    "title": "Tunnel Rush",
    "description": "Speed through tunnels at high velocity. Dodge everything!",
    "iframeUrl": "https://ubg66.gitlab.io/tunnel-rush/",
    "category": "Action"
  },
  {
    "id": "doodle-jump",
    "title": "Doodle Jump",
    "description": "Jump as high as you can on a never-ending series of platforms.",
    "iframeUrl": "https://ubg66.gitlab.io/doodle-jump/",
    "category": "Arcade"
  },
  {
    "id": "stickman-hook",
    "title": "Stickman Hook",
    "description": "Swing like a spider! Master the physics of the hook.",
    "iframeUrl": "https://ubg66.gitlab.io/stickman-hook/",
    "category": "Action"
  },
  {
    "id": "bitlife",
    "title": "BitLife",
    "description": "How will you live your BitLife?",
    "iframeUrl": "https://ubg66.gitlab.io/bitlife/",
    "category": "Simulation"
  },
  {
    "id": "crossy-road",
    "title": "Crossy Road",
    "description": "Why did the chicken cross the road?",
    "iframeUrl": "https://ubg66.gitlab.io/crossy-road/",
    "category": "Arcade"
  },
  {
    "id": "tiny-fishing",
    "title": "Tiny Fishing",
    "description": "Cast your line and catch as many fish as you can.",
    "iframeUrl": "https://ubg66.gitlab.io/tiny-fishing/",
    "category": "Arcade"
  },
  {
    "id": "temple-run-2",
    "title": "Temple Run 2",
    "description": "Run, jump, and slide away from the cursed idol.",
    "iframeUrl": "https://ubg66.gitlab.io/temple-run-2/",
    "category": "Action"
  },
  {
    "id": "subway-surfers",
    "title": "Subway Surfers",
    "description": "Dash as fast as you can and dodge oncoming trains.",
    "iframeUrl": "https://ubg66.gitlab.io/subway-surfers/",
    "category": "Action"
  },
  {
    "id": "cookie-clicker",
    "title": "Cookie Clicker",
    "description": "Bake an astronomical amount of cookies.",
    "iframeUrl": "https://ubg66.gitlab.io/cookie-clicker/",
    "category": "Arcade"
  },
  {
    "id": "1v1-lol",
    "title": "1v1.LOL",
    "description": "Build, edit, and fight!",
    "iframeUrl": "https://ubg66.gitlab.io/1v1-lol/",
    "category": "Action"
  }
];

interface HeaderProps {
  onSearch: (value: string) => void;
  favoritesCount: number;
}

interface GameCardProps {
  game: any;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

interface GamePlayerProps {
  game: any;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

interface PlayRouteProps {
  games: any[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, favoritesCount }) => (
  <header className="sticky top-0 z-50 glass-nav px-4 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:rotate-12 w-10 h-10 flex items-center justify-center text-xl">
          🫘
        </div>
        <span className="font-orbitron text-xl font-bold tracking-tighter hidden sm:block text-white uppercase neon-text">
          LiamRybolt<span className="text-blue-500">Beans</span>
        </span>
      </Link>
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search library..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-slate-900/40 border border-slate-700/30 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-100 placeholder:text-slate-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <Link to="/favorites" className="p-2.5 hover:bg-slate-800/50 rounded-xl relative group transition-colors">
          <Heart className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
              {favoritesCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  </header>
);

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, toggleFavorite }) => (
  <div className="group relative glass-card rounded-2xl overflow-hidden shadow-2xl">
    <Link to={`/play/${game.id}`} className="block">
      <div className="aspect-video relative overflow-hidden bg-slate-950 flex items-center justify-center">
        <div className="w-full h-full blue-solid-logo">
          <Gamepad2 className="w-10 h-10 text-white/90 group-hover:scale-110 transition-transform" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/10 backdrop-blur-[1px]">
           <div className="bg-white p-3 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
              <Play className="w-6 h-6 text-blue-600 fill-current ml-0.5" />
           </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold text-blue-400 font-orbitron uppercase tracking-[0.2em]">{game.category}</span>
        </div>
        <h3 className="text-[11px] font-bold text-white font-orbitron truncate uppercase tracking-tight group-hover:text-blue-400 transition-colors">{game.title}</h3>
      </div>
    </Link>
    <button
      onClick={(e) => { e.preventDefault(); toggleFavorite(game.id); }}
      className={`absolute top-2 right-2 p-1.5 rounded-xl backdrop-blur-xl transition-all ${isFavorite ? 'bg-blue-500 text-slate-900' : 'bg-slate-950/60 text-slate-300 hover:text-blue-500'}`}
    >
      <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  </div>
);

const GamePlayer: React.FC<GamePlayerProps> = ({ game, isFavorite, toggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${game.title} | LiamRyboltBeans`;
    setIsLoading(true);
    return () => { document.title = originalTitle; };
  }, [game.id, game.title]);

  const reloadModule = () => {
    setIsLoading(true);
    if (frameRef.current) {
      const src = frameRef.current.src;
      frameRef.current.src = "about:blank";
      setTimeout(() => { if (frameRef.current) frameRef.current.src = src; }, 50);
    }
  };

  const requestFullscreen = () => {
    if (frameRef.current) {
      if (frameRef.current.requestFullscreen) {
        frameRef.current.requestFullscreen();
      } else if ((frameRef.current as any).webkitRequestFullscreen) {
        (frameRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-orbitron text-[10px] tracking-widest uppercase">Return_Home</span>
        </Link>
        <div className="flex gap-4">
           <button onClick={() => toggleFavorite(game.id)} className={`px-5 py-2.5 rounded-xl text-[10px] font-orbitron flex items-center gap-2 transition-all ${isFavorite ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-900/50 glass-card text-white hover:bg-slate-800'}`}>
             <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
             {isFavorite ? 'SAVED' : 'SAVE'}
           </button>
        </div>
      </div>

      <div className="bg-slate-950 rounded-[2rem] border border-slate-800/50 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        <div className="game-container">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950">
               <div className="loading-spinner mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
               <p className="font-orbitron text-[10px] text-blue-500 tracking-[0.4em] uppercase animate-pulse">Syncing_Nodes</p>
            </div>
          )}
          <iframe 
            ref={frameRef}
            id="sandboxFrame" 
            src={game.iframeUrl} 
            onLoad={() => setIsLoading(false)}
            allowFullScreen
            scrolling="no"
            frameBorder="0"
            allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write"
          ></iframe>
        </div>
        
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 glass-nav border-t border-slate-800/50">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold font-orbitron text-white tracking-widest uppercase neon-text">
              {game.title}
            </h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button 
              onClick={reloadModule}
              title="Reload Game"
              className="p-4 bg-slate-800/50 glass-card text-slate-400 hover:text-blue-500 hover:bg-slate-700/50 rounded-xl transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={requestFullscreen} 
              title="Full Screen"
              className="px-8 py-4 bg-blue-500 text-slate-900 hover:bg-blue-400 rounded-xl transition-all font-orbitron text-[10px] font-bold flex items-center gap-2 shadow-xl shadow-blue-500/30"
            >
              <Maximize2 className="w-4 h-4" />
              FULLSCREEN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [games, setGames] = useState<any[]>(FALLBACK_GAMES);

  useEffect(() => {
    const stored = localStorage.getItem('bean_favorites');
    if (stored) setFavorites(JSON.parse(stored));

    fetch('games.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setGames(data);
      })
      .catch(() => setGames(FALLBACK_GAMES));
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id];
      localStorage.setItem('bean_favorites', JSON.stringify(next));
      return next;
    });
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, games]);

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <Header onSearch={setSearchTerm} favoritesCount={favorites.length} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="mb-14 flex flex-col border-l-4 border-blue-500 pl-6 py-2">
                <h1 className="text-5xl font-black font-orbitron tracking-tighter text-white uppercase italic neon-text">LiamRyboltBeans</h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} isFavorite={favorites.includes(game.id)} toggleFavorite={toggleFavorite} />
                ))}
              </div>
              {filteredGames.length === 0 && (
                <div className="text-center py-24 glass-card rounded-[3rem] border-dashed border-slate-700">
                  <p className="font-orbitron uppercase tracking-widest text-slate-600 text-[10px]">Archives_Empty</p>
                </div>
              )}
            </div>
          } />
          <Route path="/favorites" element={
            <div className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4 font-orbitron uppercase neon-text">Saved_Jar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {games.filter(g => favorites.includes(g.id)).map(game => (
                  <GameCard key={game.id} game={game} isFavorite={true} toggleFavorite={toggleFavorite} />
                ))}
              </div>
              {favorites.length === 0 && (
                <div className="text-center py-32 glass-card rounded-[3rem] border border-dashed border-slate-800">
                  <p className="text-slate-500 font-orbitron tracking-[0.5em] text-[10px] uppercase">No_Saved_Modules</p>
                </div>
              )}
            </div>
          } />
          <Route path="/play/:id" element={
            <PlayRoute games={games} favorites={favorites} toggleFavorite={toggleFavorite} />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

const PlayRoute: React.FC<PlayRouteProps> = ({ games, favorites, toggleFavorite }) => {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  if (!game) return <Navigate to="/" />;
  return <GamePlayer game={game} isFavorite={favorites.includes(game.id)} toggleFavorite={toggleFavorite} />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<HashRouter><App /></HashRouter>);
}