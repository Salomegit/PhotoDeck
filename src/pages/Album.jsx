import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumPhotos } from '../services/api';

export default function AlbumPage() {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Album Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-auto" />
            <p className="text-gray-800 mt-2">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}