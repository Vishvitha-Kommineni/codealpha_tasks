import React, { useState, useEffect, useRef } from "react";

const SONGS = [
  { id: 1, title: "Inkem Inkem", artist: "Sid Sriram", language: "Telugu", duration: "4:12", cover: "https://picsum.photos/seed/1/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Samajavaragamana", artist: "Sid Sriram", language: "Telugu", duration: "3:50", cover: "https://picsum.photos/seed/2/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Butta Bomma", artist: "Armaan Malik", language: "Telugu", duration: "3:33", cover: "https://picsum.photos/seed/3/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 4, title: "Kesariya", artist: "Arijit Singh", language: "Hindi", duration: "4:28", cover: "https://picsum.photos/seed/4/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 5, title: "Tum Hi Ho", artist: "Arijit Singh", language: "Hindi", duration: "4:22", cover: "https://picsum.photos/seed/5/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: 6, title: "Channa Mereya", artist: "Arijit Singh", language: "Hindi", duration: "4:49", cover: "https://picsum.photos/seed/6/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { id: 7, title: "Why This Kolaveri", artist: "Dhanush", language: "Tamil", duration: "4:10", cover: "https://picsum.photos/seed/7/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { id: 8, title: "Rowdy Baby", artist: "Dhee", language: "Tamil", duration: "4:01", cover: "https://picsum.photos/seed/8/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { id: 9, title: "Vaathi Coming", artist: "Anirudh", language: "Tamil", duration: "3:45", cover: "https://picsum.photos/seed/9/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { id: 10, title: "Shape of You", artist: "Ed Sheeran", language: "English", duration: "3:53", cover: "https://picsum.photos/seed/10/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { id: 11, title: "Blinding Lights", artist: "The Weeknd", language: "English", duration: "3:20", cover: "https://picsum.photos/seed/11/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { id: 12, title: "Levitating", artist: "Dua Lipa", language: "English", duration: "3:23", cover: "https://picsum.photos/seed/12/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { id: 13, title: "Uyire Uyire", artist: "K.J. Yesudas", language: "Malayalam", duration: "5:10", cover: "https://picsum.photos/seed/13/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { id: 14, title: "Manju Pole", artist: "Vineeth", language: "Malayalam", duration: "4:33", cover: "https://picsum.photos/seed/14/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
  { id: 15, title: "Neene Modalu", artist: "Sonu Nigam", language: "Kannada", duration: "4:18", cover: "https://picsum.photos/seed/15/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
  { id: 16, title: "Anisuthide", artist: "Sonu Nigam", language: "Kannada", duration: "4:45", cover: "https://picsum.photos/seed/16/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
  { id: 17, title: "Laembadgini", artist: "Diljit Dosanjh", language: "Punjabi", duration: "3:20", cover: "https://picsum.photos/seed/17/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 18, title: "Lahore", artist: "Guru Randhawa", language: "Punjabi", duration: "3:25", cover: "https://picsum.photos/seed/18/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 19, title: "Midnight Lofi", artist: "Chillhop", language: "Instrumental", duration: "2:55", cover: "https://picsum.photos/seed/19/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 20, title: "Rainy Mood", artist: "LoFi Beats", language: "Instrumental", duration: "3:11", cover: "https://picsum.photos/seed/20/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 21, title: "Dreamscape", artist: "Nujabes", language: "Instrumental", duration: "4:02", cover: "https://picsum.photos/seed/21/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: 22, title: "Cocaine", artist: "AP Dhillon", language: "Punjabi", duration: "3:00", cover: "https://picsum.photos/seed/22/300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
];

const NAV = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "favorites", label: "Favorites", icon: "❤️" },
  { key: "playlist", label: "Playlist", icon: "🎵" },
  { key: "recent", label: "Recently Played", icon: "⏱️" },
  { key: "trending", label: "Trending", icon: "🔥" },
];

const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

export default function App() {
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(SONGS[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [playlist, setPlaylist] = useState([SONGS[2].id, SONGS[5].id, SONGS[9].id]);
  const [recent, setRecent] = useState([]);
  const [queue] = useState(SONGS.slice(0, 8));
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => {});
    else a.pause();
  }, [playing, current]);

  const playSong = (song) => {
    setCurrent(song);
    setPlaying(true);
    setRecent((r) => [song.id, ...r.filter((id) => id !== song.id)].slice(0, 10));
  };

  const toggleFav = (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const togglePlaylist = (id) => setPlaylist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const nextSong = () => {
    const idx = SONGS.findIndex((s) => s.id === current.id);
    let next;
    if (shuffle) next = SONGS[Math.floor(Math.random() * SONGS.length)];
    else next = SONGS[(idx + 1) % SONGS.length];
    playSong(next);
  };

  const prevSong = () => {
    const idx = SONGS.findIndex((s) => s.id === current.id);
    playSong(SONGS[(idx - 1 + SONGS.length) % SONGS.length]);
  };

  const onEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else nextSong();
  };

  const filtered = SONGS.filter((s) => {
    const q = search.toLowerCase();
    return !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q) || s.language.toLowerCase().includes(q);
  });

  let listToShow = filtered;
  let viewTitle = "Home";
  if (view === "favorites") { listToShow = filtered.filter((s) => favorites.includes(s.id)); viewTitle = "Your Favorites"; }
  else if (view === "playlist") { listToShow = filtered.filter((s) => playlist.includes(s.id)); viewTitle = "Your Playlist"; }
  else if (view === "recent") { listToShow = recent.map((id) => SONGS.find((s) => s.id === id)).filter(Boolean).filter((s) => filtered.includes(s)); viewTitle = "Recently Played"; }
  else if (view === "trending") { listToShow = filtered.slice(0, 10); viewTitle = "Trending Now"; }

  const SongCard = ({ song }) => (
    <div
      onClick={() => playSong(song)}
      className={`group cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/20 ${current.id === song.id ? "ring-2 ring-fuchsia-500" : ""}`}
    >
      <div className="relative overflow-hidden rounded-xl mb-3">
        <img src={song.cover} alt={song.title} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
          <div className="w-10 h-10 rounded-full bg-fuchsia-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/50">▶</div>
        </div>
        {current.id === song.id && playing && (
          <div className="absolute top-2 left-2 flex gap-0.5 items-end h-4">
            <span className="w-1 bg-fuchsia-400 animate-pulse" style={{ height: "60%" }} />
            <span className="w-1 bg-fuchsia-400 animate-pulse" style={{ height: "100%", animationDelay: "0.2s" }} />
            <span className="w-1 bg-fuchsia-400 animate-pulse" style={{ height: "40%", animationDelay: "0.4s" }} />
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-white font-semibold truncate">{song.title}</h3>
          <p className="text-white/60 text-sm truncate">{song.artist}</p>
          <p className="text-fuchsia-400/80 text-xs mt-1">{song.language} • {song.duration}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={(e) => { e.stopPropagation(); toggleFav(song.id); }} className="text-lg hover:scale-125 transition">
            {favorites.includes(song.id) ? "❤️" : "🤍"}
          </button>
          <button onClick={(e) => { e.stopPropagation(); togglePlaylist(song.id); }} className="text-sm hover:scale-125 transition" title="Playlist">
            {playlist.includes(song.id) ? "➖" : "➕"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#13002a] to-[#000010] text-white font-sans">
      <audio
        ref={audioRef}
        src={current.url}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={onEnded}
      />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-black/40 backdrop-blur-2xl border-r border-white/10 p-6 gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-8">🎧 Wavely</h1>
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setView(n.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${view === n.key ? "bg-gradient-to-r from-fuchsia-600/40 to-purple-600/40 text-white shadow-lg" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
            >
              <span className="text-lg">{n.icon}</span>
              <span className="font-medium">{n.label}</span>
            </button>
          ))}
          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 border border-white/10">
            <p className="text-sm text-white/80">Go Premium</p>
            <p className="text-xs text-white/50 mt-1">Unlimited skips & HD audio</p>
            <button className="mt-3 w-full py-2 rounded-lg bg-white text-black font-semibold text-sm hover:scale-105 transition">Upgrade</button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto pb-32">
          {/* Topbar */}
          <div className="sticky top-0 z-20 bg-black/40 backdrop-blur-2xl border-b border-white/10 p-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search songs, artists, languages..."
                className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
            </div>
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 items-center justify-center font-bold">U</div>
          </div>

          <div className="p-6 space-y-10">
            {view === "home" && !search && (
              <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-fuchsia-600/40 via-purple-700/30 to-cyan-600/30 border border-white/10">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-fuchsia-500/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl" />
                <div className="relative">
                  <p className="text-fuchsia-300 text-sm font-medium mb-2">FEATURED PLAYLIST</p>
                  <h2 className="text-4xl md:text-6xl font-bold mb-3">Vibes of the Week</h2>
                  <p className="text-white/70 max-w-lg mb-6">Hand-picked hits across Telugu, Hindi, Tamil, English & more. Press play and let the rhythm take over.</p>
                  <button onClick={() => playSong(SONGS[0])} className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition shadow-2xl">▶ Play Now</button>
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">{search ? `Results for "${search}"` : viewTitle}</h2>
                <span className="text-white/40 text-sm">{listToShow.length} songs</span>
              </div>
              {listToShow.length === 0 ? (
                <div className="py-16 text-center text-white/50">No songs found.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {listToShow.map((s) => <SongCard key={s.id} song={s} />)}
                </div>
              )}
            </section>

            {view === "home" && !search && (
              <>
                <section>
                  <h2 className="text-2xl font-bold mb-5">🔥 Trending Now</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {SONGS.slice(0, 5).map((s) => <SongCard key={s.id} song={s} />)}
                  </div>
                </section>
                <section>
                  <h2 className="text-2xl font-bold mb-5">⏱️ Recently Played</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {(recent.length ? recent.map((id) => SONGS.find((s) => s.id === id)) : SONGS.slice(10, 15)).map((s) => s && <SongCard key={s.id} song={s} />)}
                  </div>
                </section>
                <section>
                  <h2 className="text-2xl font-bold mb-5">✨ Recommended For You</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {SONGS.slice(15, 22).map((s) => <SongCard key={s.id} song={s} />)}
                  </div>
                </section>
              </>
            )}
          </div>
        </main>

        {/* Queue */}
        <aside className="hidden xl:flex w-80 flex-col bg-black/40 backdrop-blur-2xl border-l border-white/10 p-6 overflow-y-auto pb-32">
          <h3 className="text-lg font-bold mb-4">Up Next</h3>
          <div className="space-y-2">
            {queue.map((s) => (
              <div key={s.id} onClick={() => playSong(s)} className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition ${current.id === s.id ? "bg-fuchsia-500/20" : "hover:bg-white/5"}`}>
                <img src={s.cover} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{s.title}</p>
                  <p className="text-xs text-white/50 truncate">{s.artist}</p>
                </div>
                <span className="text-xs text-white/40">{s.duration}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-2xl border-t border-white/10 px-4 py-3 z-30">
        <div className="flex items-center gap-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3 w-1/4 min-w-0">
            <img src={current.cover} alt="" className={`w-14 h-14 rounded-lg object-cover ${playing ? "animate-pulse" : ""}`} />
            <div className="min-w-0">
              <p className="font-semibold truncate">{current.title}</p>
              <p className="text-xs text-white/50 truncate">{current.artist}</p>
            </div>
            <button onClick={() => toggleFav(current.id)} className="hidden sm:block hover:scale-125 transition">
              {favorites.includes(current.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <button onClick={() => setShuffle(!shuffle)} className={`text-lg transition ${shuffle ? "text-fuchsia-400" : "text-white/60 hover:text-white"}`}>🔀</button>
              <button onClick={prevSong} className="text-xl text-white/80 hover:text-white hover:scale-110 transition">⏮</button>
              <button onClick={() => setPlaying(!playing)} className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition shadow-lg shadow-fuchsia-500/30">
                {playing ? "⏸" : "▶"}
              </button>
              <button onClick={nextSong} className="text-xl text-white/80 hover:text-white hover:scale-110 transition">⏭</button>
              <button onClick={() => setRepeat(!repeat)} className={`text-lg transition ${repeat ? "text-fuchsia-400" : "text-white/60 hover:text-white"}`}>🔁</button>
            </div>
            <div className="w-full flex items-center gap-2 text-xs text-white/50">
              <span>{fmt(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => { audioRef.current.currentTime = e.target.value; setProgress(e.target.value); }}
                className="flex-1 accent-fuchsia-500 h-1"
              />
              <span>{fmt(duration)}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 w-1/4 justify-end">
            <button onClick={() => setMuted(!muted)} className="text-lg text-white/70 hover:text-white">{muted || volume === 0 ? "🔇" : "🔊"}</button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => { setVolume(parseFloat(e.target.value)); setMuted(false); }}
              className="w-24 accent-fuchsia-500 h-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
