import api from "./interceptors";

export const getMovies = (page, sort) => {
  return api.get(
    `/discover/movie?include_video=false&language=en-US&page=${page}&sort_by=${sort}&search&?api_key=64d0f5ceca11245b2ed56aa6024baee6`
  );
};

export const getMoviesDetails = (id) => {
  return api.get(
    `/movie/${id}?language=en-US?api_key=64d0f5ceca11245b2ed56aa6024baee6`
  );
};
