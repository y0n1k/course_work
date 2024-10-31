const axios = require('axios');
const API_KEY = 'a8ab25fb'; // Замініть на ваш реальний ключ

const getMovieByTitle = async (title) => {
   try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
   }
};

const getMovieById = async (id) => {
   try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
   }
};

module.exports = {
   getMovieByTitle,
   getMovieById
};
