// src/services/PostService.js
import axios from 'axios';

const PostService = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default PostService;
