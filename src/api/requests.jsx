const endpoint = "https://api.themoviedb.org/3";
export const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const requests = {
	getConfigurations: `${endpoint}/configuration`,
	getPopularMovies: `${endpoint}/movie/popular?language=en`,
	getTopRatedMovies: `${endpoint}/movie/top_rated?language=en`,
	getMovieDetails: `${endpoint}/movie/`,
	getCurrentlyPlaying: `${endpoint}/movie/now_playing?region=in`,
	getPopularTVShows: `${endpoint}/tv/popular?language=en`,
	getTopRatedTVShows: `${endpoint}/tv/top_rated?language=en`,
	getTvDetails: `${endpoint}/tv/`,
	search: `${endpoint}/search/multi?language=en&query=`,
	getMovieGenres: `${endpoint}/genre/movie/list`,
	getTvGenres: `${endpoint}/genre/tv/list`,
};

export default requests;
