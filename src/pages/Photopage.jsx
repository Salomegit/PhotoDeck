// // pages/PhotoPage.jsx
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { updatePhotoTitle } from '../services/api';
// import Loader from '../components/Loader';

// export default function PhotoPage() {
//   const { photoId } = useParams();
//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState('');

//   useEffect(() => {
//     const loadPhoto = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/photos/${photoId}`);
//         setPhoto(response.data);
//         setNewTitle(response.data.title);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPhoto();
//   }, [photoId]);

//   const handleSave = async () => {
//     if (!photo) return;
//     try {
//       await updatePhotoTitle(photo.id, newTitle);
//       setPhoto({ ...photo, title: newTitle });
//       setEditing(false);
//     } catch (error) {
//       console.error('Failed to update photo title:', error);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="container mx-auto p-4">
//       {photo && (
//         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//           <img 
//             src={photo.url} 
//             alt={photo.title} 
//             className="w-full h-64 object-cover mb-4 rounded-lg"
//           />
//           {editing ? (
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="text"
//                 value={newTitle}
//                 onChange={(e) => setNewTitle(e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button
//                 onClick={handleSave}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2 mb-4">
//               <h2 className="text-xl font-semibold">{photo.title}</h2>
//               <button
//                 onClick={() => setEditing(true)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 Edit
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }