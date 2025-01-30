import Navbar from "../components/Navbar.jsx";
export default function Landing() {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Hero Section */}
      <div className="w-full bg-blue-600 text-white py-16 px-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Photo Album Explorer
        </h1>
        <p className="text-lg mb-6">
          Discover user albums and photos seamlessly. Sign in to get started!
        </p>
        <button
          className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
          Get Started with Google
        </button>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            View User Albums
          </h3>
          <p className="text-gray-600">
            Browse through a collection of user albums and discover their unique content effortlessly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Explore Photos
          </h3>
          <p className="text-gray-600">
            Dive into beautiful photos curated within each album, all fetched dynamically from the JSONPlaceholder API.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Easy and Seamless Access
          </h3>
          <p className="text-gray-600">
            Enjoy a clean, responsive, and user-friendly interface designed to simplify your browsing experience.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-10 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Photo Album Explorer. All rights reserved.
      </footer>
    </div>
          </>
  );
}
