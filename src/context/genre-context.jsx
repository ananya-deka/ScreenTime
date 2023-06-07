import { createContext, useContext, useState } from "react";

const GenreContext = createContext();
export const useGenre = () => useContext(GenreContext);

const GenreProvider = (props) => {
	const [movieGenres, setMovieGenres] = useState([]);
	const [tvGenres, setTvGenres] = useState([]);

	function setMovieGenresHandler(genres) {
		setMovieGenres(genres);
	}

	function setTvGenresHandler(genres) {
		setTvGenres(genres);
	}

	const value = {
		movieGenres,
		tvGenres,
		setMovieGenres: setMovieGenresHandler,
		setTvGenres: setTvGenresHandler,
	};

	return (
		<GenreContext.Provider value={value}>
			{props.children}
		</GenreContext.Provider>
	);
};

export default GenreProvider;
