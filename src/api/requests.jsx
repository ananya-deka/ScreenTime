const endpoint = "https://api.themoviedb.org/3";
export const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const requests = {
	getConfigurations: `${endpoint}/configuration`,
	getPopularMovies: `${endpoint}/movie/popular?language=en`,
	getTopRatedMovies: `${endpoint}/movie/top_rated?language=en`,
	getMovieDetails: `${endpoint}/movie/`,
	getCurrentlyPlaying: `${endpoint}/movie/now_playing?region=`,

	getPopularTv: `${endpoint}/tv/popular?language=en`,
	getTopRatedTv: `${endpoint}/tv/top_rated?language=en`,
	getTvDetails: `${endpoint}/tv/`,
	search: `${endpoint}/search/multi?language=en&query=`,
	getMovieGenres: `${endpoint}/genre/movie/list`,
	getTvGenres: `${endpoint}/genre/tv/list`,
	getMovieByGenre: `${endpoint}/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=`,
	getTvByGenre: `${endpoint}/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=`,
	getMovieStreamingPlatforms: (id) =>
		`${endpoint}/movie/${id}/watch/providers`,
	getTvStreamingPlatforms: (id) =>
		`${endpoint}/tv/${id}/season/1/watch/providers`,
	getCredits: (id, mediaType) => `${endpoint}/${mediaType}/${id}/credits`,
	getRecommendations: (id, mediaType) =>
		`${endpoint}/${mediaType}/${id}/similar`,
};

export default requests;
