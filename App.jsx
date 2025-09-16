// src/App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";



function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [activeSection, setActiveSection] = useState("home"); // home | playlist | favourites
   
  useEffect(() => {
    fetch("/db/db.json")
      .then((res) => res.json())
      .then((data) => setSongs(data.items))
      .catch((err) => console.error("Error loading songs:", err));
  }, []);

  // Filter songs by search (only for Home)
  const filteredSongs =
    activeSection === "home"
      ? songs.filter(
          (song) =>
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.singer.toLowerCase().includes(search.toLowerCase()) ||
            song.genre.toLowerCase().includes(search.toLowerCase())
        )
      : activeSection === "playlist"
      ? playlist
      : favourites;

  // Add song to Playlist
  const addToPlaylist = (song) => {
    if (!playlist.find((s) => s.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  // Add song to Favourites
  const addToFavourites = (song) => {
    if (!favourites.find((s) => s.id === song.id)) {
      setFavourites([...favourites, song]);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-500 to-blue-400 text-gray-900">
    
      {/* Sidebar */}
       <div className="w-64 bg-pink-500 text-white flex flex-col p-6"
        style={{
    backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20240707/pngtree-rhythmic-radiance-musical-notes-in-colorful-harmony-image_15988591.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
       <h1 className="text-2xl font-bold mb-8 text-center" style={{ fontStyle: "revert-layer" , color: "white"}}>🎶 Music Player</h1>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveSection("home")}
            className={`text-left p-2 rounded ${
              activeSection === "home" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
           <h2 style={{ fontStyle: "italic" , color: "white" }}>Home</h2>
          </button>
          <button
            onClick={() => setActiveSection("playlist")}
            className={`text-left p-2 rounded ${
              activeSection === "playlist" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
           <h2 style={{ fontStyle: "italic" , color: "white" }}>Playlist ({playlist.length})</h2>
          </button>
          <button
            onClick={() => setActiveSection("favourites")}
            className={`text-left p-2 rounded ${
              activeSection === "favourites" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
           <h2 style={{ fontStyle: "italic" , color: "white"}}>Favourites ({favourites.length})</h2>
          </button>
        </nav>
      </div>

      {/* Main Content */}
     <div className="flex-1 p-8 overflow-y-auto main-content -tl-3xl shadow-lg"
     style={{
      backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/041/390/430/small_2x/ai-generated-abstract-musical-notes-with-sparkling-bokeh-background-photo.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
     }}>
     {/* Search Bar (only for Home) */}
        {activeSection === "home" && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search songs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 shadow-sm"
            />
          </div>
        )}

        {/* Section Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-Italic mb-2 capitalize" style={{ color: "yellow" }}>{activeSection}</h2>
          <p className="text-gray-600" style={{color: "white"}}>
          
            {activeSection === "home" &&
              "Browse all songs and add them to your Playlist or Favourites."}
            {activeSection === "playlist" && "Your personal playlist."}
            {activeSection === "favourites" && "Your favourite songs."}
          </p>
        </div>

        {/* Songs Grid */}
        {filteredSongs.length === 0 ? (
          <p className="text-center text-gray-500" style={{color: "white"}}>No songs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSongs.map((song) => (
              <div
                className="song-card bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                key={song.id}
              >
                <img
                  src={song.imgUrl}
                  alt={song.title}
                  className="cover w-full h-40 object-cover rounded"
                />
                <h2 className="text-lg font-bold mt-3">{song.title}</h2>
                <p>
                  <strong>Singer:</strong> {song.singer}
                </p>
                <p>
                  <strong>Genre:</strong> {song.genre}
                </p>
                <audio 
                      controls 
                      className="w-full mt-3 rounded"
                >
                      <source src={song.songUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                </audio>


                {/* Action Buttons */}
                {activeSection === "home" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => addToPlaylist(song)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      ➕ Playlist
                    </button>
                    <button
                      onClick={() => addToFavourites(song)}
                      className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 text-sm"
                    >
                      ❤️ Favourite
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
