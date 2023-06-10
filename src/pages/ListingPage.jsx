import requests from "../api/requests";
import axios from "../api/axios";
import { useLoaderData, Link, useNavigate, useParams } from "react-router-dom";

import TopRatedList from "../components/main/TopRatedList";
import List from "../components/main/List";
import Genres from "../components/main/Genres";
import { useGenre } from "../context/genre-context";
import Header from "../components/UI/Header";
import { useEffect, useState } from "react";

const ListingPage = () => {
	const params = useParams();
	const { topRated, popular } = useLoaderData();
	const { movieGenres, tvGenres } = useGenre();
	const [title, setTitle] = useState("");
	const mediaType = params.mediaType;
	const genres = mediaType === "movie" ? movieGenres : tvGenres;

	useEffect(() => {
		setTitle(params.mediaType === "movies" ? "Movies" : "TV Shows");
	}, [params.mediaType]);

	return (
		<>
			<TopRatedList title={`Top Rated `} items={topRated}></TopRatedList>
			<List
				title={`Popular Right Now`}
				items={popular}
				expanded={false}
				id="popular"
				media_type={mediaType === "movies" ? "movie" : "tv"}
			/>
			{genres.map((genre) => (
				<Genres
					key={genre.id}
					genreId={genre.id}
					title={genre.name}
					media_type={mediaType === "movies" ? "movie" : "tv"}
					name={genre.name}
				/>
			))}
		</>
	);
};

export async function loader({ params }) {
	const mediaType = params.mediaType;
	if (mediaType !== "movies" && mediaType !== "tv") {
		return;
	}

	const topRatedResponse = await axios.get(
		mediaType === "movies"
			? requests.getTopRatedMovies
			: requests.getTopRatedTv
	);
	const topRatedData = topRatedResponse.data.results;

	let topRated = [];

	topRatedData.forEach((entry) => {
		topRated.push({
			...entry,
			media_type: mediaType === "movies" ? "movie" : "tv",
		});
	});

	const popularResponse = await axios.get(
		mediaType === "movies"
			? requests.getPopularMovies
			: requests.getPopularTv
	);
	const popularData = popularResponse.data.results;

	let popular = [];

	popularData.forEach((entry) => {
		popular.push({
			...entry,
			media_type: mediaType === "movies" ? "movie" : "tv",
		});
	});

	return { topRated, popular };
}

export default ListingPage;
