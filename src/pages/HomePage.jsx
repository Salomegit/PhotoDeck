// pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
// import Loader from '../components/Loader';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const data = await fetchUsers();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadData();
  // }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2 text-blue-600">
              Albums: {user.albums?.length || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}