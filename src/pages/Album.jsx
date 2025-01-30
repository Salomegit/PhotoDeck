import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumPhotos } from '../services/api';
import Navbar from '../components/Navbar.jsx';
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
              <img src={photo.url} alt="data:image/jpeg;base64,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" className="w-full h-auto" />
              <h3 className="text-lg font-bold text-gray-800 mt-2">Photo Title</h3>
              <p className="text-gray-800 mt-2">{photo.title}</p>
              <button
                onClick={() => navigate(`/albums/${albumId}/photos/${photo.id}/edit`)}
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