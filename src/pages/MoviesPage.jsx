import requests from "../api/requests";
import axios from "../api/axios";
import { useLoaderData, Link, useNavigate } from "react-router-dom";

import TopRatedList from "../components/main/TopRatedList";
import List from "../components/main/List";
import { useEffect, useState } from "react";
import Genres from "../components/main/Genres";
import Select from "react-select";
import { useGenre } from "../context/genre-context";

const MoviesPage = () => {
	const { topRatedMovies, popularMovies } = useLoaderData();
	const navigate = useNavigate();
	const [selected, setSelected] = useState(null);
	const { movieGenres: genres } = useGenre();
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const genreOptions = genres.map((genre) => ({
			value: genre.name,
			label: genre.name,
			id: genre.id,
		}));
		setOptions(genreOptions);
	}, [genres]);

	// useEffect(() => {
	// 	if (selectedGenre) {
	// 		navigate(`/genres/movie/${selectedGenre.id}`);
	// 	}
	// }, [selectedGenre]);

	useEffect(() => {
		if (selected) {
			navigate(`/genres/movie/${selected.id}`);
		}
	}, [selected]);

	function switchGenres(selectedOption) {
		setSelected(selectedOption);
	}

	return (
		<>
			<div>
				<Select onChange={switchGenres} options={options} />
			</div>

			<TopRatedList
				title={`Top Rated Movies`}
				items={topRatedMovies}
			></TopRatedList>
			<List
				title={`Popular Right Now`}
				items={popularMovies}
				expanded={false}
				id="popular"
				media_type="movie"
			/>
			{genres.map((genre) => (
				<Genres
					key={genre.id}
					genreId={genre.id}
					title={genre.name}
					media_type="movie"
					name={genre.name}
				/>
			))}
		</>
	);
};

export async function loader() {
	const topRatedResponse = await axios.get(requests.getTopRatedMovies);
	const topRatedData = topRatedResponse.data.results;

	let topRatedMovies = [];

	topRatedData.forEach((entry) => {
		topRatedMovies.push({ ...entry, media_type: "movie" });
	});

	const popularResponse = await axios.get(requests.getPopularMovies);
	const popularData = popularResponse.data.results;

	let popularMovies = [];

	popularData.forEach((entry) => {
		popularMovies.push({ ...entry, media_type: "movie" });
	});

	return { topRatedMovies, popularMovies };
}

export default MoviesPage;
