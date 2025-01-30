import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumPhotos, updatePhotoTitle } from '../services/api'; // Make sure to implement your API functions
import Navbar from '../components/Navbar';
export default function PhotoEdit() {
  const { photoId, albumId } = useParams(); // Access the photoId and albumId from the route params
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  // const navigate = useNavigate(); // To redirect after updating

  useEffect(() => {
    const loadPhoto = async () => {
      const photos = await fetchAlbumPhotos(albumId); // Fetch all photos (adjust as needed)
      const selectedPhoto = photos.find((p) => p.id === parseInt(photoId));
      setPhoto(selectedPhoto);
      setNewTitle(selectedPhoto.title);
      setLoading(false);
    };

    loadPhoto();
  }, [photoId,albumId]);

  const handleEditTitle = async () => {
    try {
      
     const updatedPhoto = await updatePhotoTitle(photoId, newTitle); // Assuming you have an update function
      setPhoto( (prevPhoto) => ({
        ...prevPhoto,
        title: updatedPhoto.title // Update the title with the response data
      }));
      setEditing(false);
    
    } catch (error) {
      console.error("Error updating title:", error);

    }}

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="border-t-4 border-green-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      );
    }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Photo</h1>
      <img src={photo.url} alt="photo" className="w-full h-auto mb-4" />
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
        <div>
          <p className="text-gray-800">{photo.title}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Title
          </button>
        </div>
      )}
    </div>
      </>
  );
}
