import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumPhotos, updatePhotoTitle } from '../services/api';

export default function PhotoEdit() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const loadPhoto = async () => {
      const photos = await fetchAlbumPhotos(1); // Fetch all photos (adjust as needed)
      const selectedPhoto = photos.find((p) => p.id === parseInt(photoId));
      setPhoto(selectedPhoto);
      setLoading(false);
    };

    loadPhoto();
  }, [photoId]);

  const handleEditTitle = async () => {
    await updatePhotoTitle(photoId, newTitle);
    setPhoto({ ...photo, title: newTitle });
    setEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Photo</h1>
      <img src={photo.url} alt={photo.title} className="w-full h-auto mb-4" />
      {editing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <button
            onClick={handleEditTitle}
            className="ml-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-800" onClick={() => setEditing(true)}>
          {photo.title}
        </p>
      )}
    </div>
  );
}