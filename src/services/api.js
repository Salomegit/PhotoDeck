// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  
};

export const fetchUserAlbums = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums?userId=${userId}`);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching user albums:", error);
  }
};

export const fetchAlbumPhotos = async (albumId) => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/albums/${albumId}/photos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching album photos:", error);
  }
};

export const updatePhotoTitle = async (photoId, newTitle) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/photos/${photoId}`, {
      title: newTitle
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating photo title:", error);
  }
};