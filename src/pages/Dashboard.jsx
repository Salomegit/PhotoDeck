import { useEffect, useState } from 'react';
import { fetchUsers, fetchUserAlbums } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setUserLoading] = useState(true);
  const navigate = useNavigate();
  const LoadUsersWithAlbums = async () => {
    const users = await fetchUsers();
    const usersWithAlbums = await Promise.all(
      users.map(async (user) => {
        const albums = await fetchUserAlbums(user.id);
        return {
          ...user,
          albums,
        };
      })
    );
    setUsers(usersWithAlbums);
    setUserLoading(false);
  };

  useEffect(() => {
  
      LoadUsersWithAlbums();
    
  }, []);

  const handleViewAlbums = (userId) => {
    navigate(`/user/${userId}`);
  };

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
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Users List</h2>

        { loading ?(
          <div className="text-gray-700 text-lg font-semibold">Loading user details...</div>
        ) : users.length === 0 ? (
          <div className="text-gray-700 text-lg font-semibold">No users found</div>
        ) : (
          <div className="flex flex-col space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.albums.length} albums</p>
                </div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => handleViewAlbums(user.id)}
                >
                  View Album
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
