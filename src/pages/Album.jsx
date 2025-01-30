import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumPhotos } from '../services/api';
import Navbar from '../components/Navbar';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AlbumPage() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      const albumPhotos = await fetchAlbumPhotos(albumId);
      setPhotos(albumPhotos);
      setLoading(false);
    };

    loadPhotos();
  }, [albumId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-green-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Album Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={photo.url} alt="photo" className="w-full h-auto" />
            <h3 className="text-lg font-bold text-gray-800 mt-2">Photo Title</h3>
            <p className="text-gray-800 mt-2">{photo.title}</p>
            <button
                onClick={() => navigate(`/photo/${photo.id}/edit`)}
                className="mt-2 p-2 text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} /> 
              </button>
          </div>
        ))}
      </div>
    </div>
        </>
  );
}