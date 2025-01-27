// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const fetchUserAlbums = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/albums?userId=${userId}`);
  return response.data;
};

export const fetchAlbumPhotos = async (albumId) => {
  const response = await axios.get(`${API_BASE_URL}/photos?albumId=${albumId}`);
  return response.data;
};

export const updatePhotoTitle = async (photoId, newTitle) => {
  const response = await axios.patch(`${API_BASE_URL}/photos/${photoId}`, {
    title: newTitle
  });
  return response.data;
};