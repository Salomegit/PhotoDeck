import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserAlbums, fetchUsers } from '../services/api';
import Navbar from '../components/Navbar.jsx';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const LoadUserAlbums = async () => {
    try {
      const users = await fetchUsers();
      if (users) {
        const SelectedUser = users.find((user) => user.id === parseInt( userId));
        if (SelectedUser) {
          setUser(SelectedUser);
        }
        const albums = await fetchUserAlbums(userId);
        setAlbums(albums);
        setLoading(false);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to fetch user albums:', error);
      navigate('/dashboard');
    }
  };
  const handleViewAlbum = (albumId) => {
    navigate(`/album/${albumId}`);
  };
  useEffect(() => { LoadUserAlbums() }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-green-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div>
<Navbar/>
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4"> View Albums</h2>
      <div className="flex flex-col space-y-4">
        {albums.map((album) => (
          <div
          key={album.id}
          className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
          >
            <h3 className="text-lg font-bold text-gray-800">{album.title}</h3>
            <button
              onClick={() => handleViewAlbum(album.id)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
              View Photos
            </button>
          </div>
        ))}
      </div>
    </div>
        </div>
  )
}

export default UserPage;