import requests from "../api/requests";
import axios from "../api/axios";
import { useLoaderData } from "react-router-dom";

import TopRatedList from "../components/main/TopRatedList";
import Section from "../components/main/Section";

const MoviesPage = () => {
	const { topRatedMovies, popularMovies } = useLoaderData();

	return (
		<>
			<TopRatedList items={topRatedMovies}></TopRatedList>
			<Section title={`Popular Right Now`} items={popularMovies} />
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
