import { useState, useEffect } from "react";

import {
  FaTimes,
  FaGoogle,
  FaHeart,
  FaMoon,
  FaSun
} from "react-icons/fa";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {

      setLoading(false);

    }, 2500);

  }, []);

  const [showModal, setShowModal] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [username, setUsername] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [darkMode, setDarkMode] = useState(true);

  const [memories, setMemories] = useState([

    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",

      title: "Mountain Escape",

      location: "Himachal Pradesh",

      category: "Nature",

      likes: 0
    },

    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",

      title: "Beach Sunset",

      location: "Goa",

      category: "Travel",

      likes: 0
    },

    {
      image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200",

      title: "City Lights",

      location: "Mumbai",

      category: "Urban",

      likes: 0
    }

  ]);

  const filteredMemories = memories.filter((memory) => {

    const matchesSearch =

      memory.title.toLowerCase()
        .includes(search.toLowerCase())

      ||

      memory.location.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =

      selectedCategory === "All"

      ||

      memory.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const [formData, setFormData] = useState({

    image: "",
    title: "",
    location: "",
    category: ""
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const publishMemory = () => {

    if (
      formData.image &&
      formData.title &&
      formData.location &&
      formData.category
    ) {

      setMemories([{ ...formData, likes: 0 }, ...memories]);

      setFormData({

        image: "",
        title: "",
        location: "",
        category: ""
      });

      setShowModal(false);
    }
  };

  const loginUser = () => {

    if (username) {

      setLoggedIn(true);

      setShowLogin(false);
    }
  };

  if (loading) {

    return (

      <div className="h-screen flex items-center justify-center bg-black text-white flex-col">

        <h1 className="text-6xl font-bold animate-pulse">

          KV Gallery ✨

        </h1>

        <p className="mt-5 text-slate-400 text-xl">

          Loading Memories...

        </p>

      </div>
    )
  }

  return (

    <div className={`min-h-screen transition duration-500

    ${darkMode

        ?

        "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"

        :

        "bg-gradient-to-br from-slate-100 via-white to-slate-200 text-black"

      }`}>

      {/* Navbar */}

      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold tracking-wide">

          KV Gallery ✨

        </h1>

        <div className="flex items-center gap-4">

          <button

            onClick={() => setDarkMode(!darkMode)}

            className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition duration-300">

            {darkMode ? <FaSun /> : <FaMoon />}

          </button>

          {loggedIn ? (

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">

                {username.charAt(0).toUpperCase()}

              </div>

              <span className="text-lg">

                {username}

              </span>

            </div>

          ) : (

            <button

              onClick={() => setShowLogin(true)}

              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full transition duration-300">

              Sign In

            </button>

          )}

        </div>

      </nav>

      {/* Hero */}

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h2 className="text-6xl font-bold leading-tight max-w-4xl">

          Share Your Perspectives With The World 🌍

        </h2>

        <p className="text-slate-300 mt-8 text-xl max-w-2xl">

          A modern visual storytelling platform for creators.

        </p>

        <button

          onClick={() => setShowModal(true)}

          className="mt-10 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full text-lg transition duration-300">

          Share Perspective

        </button>

      </section>

      {/* Search */}

      <section className="px-10 pb-10">

        <div className="flex flex-col md:flex-row gap-5 justify-between">

          <input

            type="text"

            placeholder="Search memories or locations..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="bg-slate-800 px-5 py-4 rounded-2xl outline-none w-full md:w-[50%]"
          />

          <div className="flex gap-3 flex-wrap">

            {["All", "Nature", "Travel", "Urban"].map((cat) => (

              <button

                key={cat}

                onClick={() => setSelectedCategory(cat)}

                className={`px-5 py-3 rounded-full transition duration-300

                ${selectedCategory === cat

                    ?

                    "bg-blue-500"

                    :

                    "bg-slate-800 hover:bg-slate-700"

                  }`}>

                {cat}

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* Gallery */}

      <section className="px-10 pb-20">

        <h2 className="text-4xl font-bold mb-10">

          Explore Memories ✨

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {filteredMemories.map((memory, index) => (

            <div
              key={index}

              className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-500">

              <img
                src={memory.image}

                onClick={() => setSelectedImage(memory.image)}

                className="w-full h-72 object-cover cursor-pointer" />

              <div className="p-6">

                <span className="bg-blue-500 px-4 py-1 rounded-full text-sm">

                  {memory.category}

                </span>

                <h3 className="text-2xl font-bold mt-4">

                  {memory.title}

                </h3>

                <p className="text-slate-300 mt-2">

                  📍 {memory.location}

                </p>

                <div className="mt-4 flex items-center justify-between">

                  <button

                    onClick={() => {

                      const updatedMemories = [...memories];

                      updatedMemories[index].likes += 1;

                      setMemories(updatedMemories);

                    }}

                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition duration-300">

                    <FaHeart className="text-red-500" />

                    {memory.likes}

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Upload Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 p-8 rounded-3xl w-[90%] max-w-lg relative">

            <button

              onClick={() => setShowModal(false)}

              className="absolute top-5 right-5 text-xl">

              <FaTimes />

            </button>

            <h2 className="text-3xl font-bold mb-8">

              Share Perspective ✨

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 outline-none" />

              <input
                type="text"
                name="title"
                placeholder="Memory Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 outline-none" />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 outline-none" />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 outline-none" />

              <button

                onClick={publishMemory}

                className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-lg transition duration-300">

                Publish To Gallery 🚀

              </button>

            </div>

          </div>

        </div>

      )}

      {/* Login Modal */}

      {showLogin && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 p-8 rounded-3xl w-[90%] max-w-md relative">

            <button

              onClick={() => setShowLogin(false)}

              className="absolute top-5 right-5 text-xl">

              <FaTimes />

            </button>

            <h2 className="text-3xl font-bold mb-8 text-center">

              Sign In ✨

            </h2>

            <div className="space-y-5">

              <input

                type="text"

                placeholder="Enter Your Name"

                value={username}

                onChange={(e) => setUsername(e.target.value)}

                className="w-full p-4 rounded-xl bg-slate-800 outline-none" />

              <button

                onClick={loginUser}

                className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-lg transition duration-300">

                Continue

              </button>

              <button

                className="w-full border border-slate-600 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition duration-300">

                <FaGoogle />

                Continue With Google

              </button>

            </div>

          </div>

        </div>

      )}

      {/* Lightbox */}

      {selectedImage && (

        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <button

            onClick={() => setSelectedImage(null)}

            className="absolute top-6 right-6 text-3xl">

            <FaTimes />

          </button>

          <img

            src={selectedImage}

            className="max-h-[90%] max-w-[90%] rounded-2xl shadow-2xl" />

        </div>

      )}

    </div>
  )
}

export default App
