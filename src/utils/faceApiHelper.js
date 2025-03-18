import axios from 'axios';
import FormData from 'form-data';
import { FACE_PP_CONFIG } from '../config/api.config';

export const analyzeFace = async (imageBase64) => {
  try {
    const formData = new FormData();
    formData.append('api_key', FACE_PP_CONFIG.API_KEY);
    formData.append('api_secret', FACE_PP_CONFIG.API_SECRET);
    
    // Remove the data:image/jpeg;base64, prefix
    const base64Image = imageBase64.split(',')[1];
    formData.append('image_base64', base64Image);
    formData.append('return_attributes', 'emotion');

    const response = await axios.post(FACE_PP_CONFIG.API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing face:', error);
    throw error;
  }
};