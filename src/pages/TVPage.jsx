import requests from "../api/requests";
import axios from "../api/axios";

import { useLoaderData } from "react-router-dom";
import TopRatedList from "../components/main/TopRatedList";
import List from "../components/main/List";
import Genres from "../components/main/Genres";
import { useState, useEffect } from "react";

const TVPage = () => {
	const { topRatedTVShows, popularTVShows } = useLoaderData();
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		async function loadGenres() {
			const response = await axios.get(requests.getTvGenres);
			setGenres(response.data.genres);

			return response;
		}

		loadGenres();
	}, []);

	return (
		<>
			<TopRatedList
				title={`Top Rated TV Shows`}
				items={topRatedTVShows}
			/>
			<List
				title={`Popular Right Now`}
				items={popularTVShows}
				expanded={false}
				id="popular"
				media_type="tv"
			/>
			{genres.map((genre) => (
				<Genres
					key={genre.id}
					genreId={genre.id}
					title={genre.name}
					media_type="tv"
					name={genre.name}
				/>
			))}
		</>
	);
};

export async function loader() {
	const topRatedResponse = await axios.get(requests.getTopRatedTVShows);
	const topRatedData = topRatedResponse.data.results;

	let topRatedTVShows = [];

	topRatedData.forEach((entry) => {
		topRatedTVShows.push({ ...entry, media_type: "tv" });
	});

	const popularResponse = await axios.get(requests.getPopularTVShows);
	const popularData = popularResponse.data.results;

	let popularTVShows = [];

	popularData.forEach((entry) => {
		popularTVShows.push({ ...entry, media_type: "tv" });
	});

	return { topRatedTVShows, popularTVShows };
}

export default TVPage;
