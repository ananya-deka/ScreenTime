import classes from "./Genres.module.css";

import { useState, useEffect } from "react";

const Genres = () => {
	const [movieGenres, setMovieGenres] = useState();
	const [tvGenres, setTvGenres] = useState();

	useEffect(() => {
		async function loadMovieGenres() {
			const response = await axios.get(requests.getMovieGenres);
			setMovieGenres(response.data.genres);

			return response;
		}

		async function loadTvGenres() {
			const response = await axios.get(requests.getTvGenres);
			setTvGenres(response.data.genres);

			return response;
		}

		loadMovieGenres();
		loadTvGenres();
	}, []);

	return <></>;
};

export default Genres;
