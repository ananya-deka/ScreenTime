import requests from "../api/requests";
import axios from "../api/axios";
import { useLoaderData, useParams } from "react-router-dom";

import CarouselList from "../components/main/CarouselList";
import List from "../components/main/List";
import Genres from "../components/main/Genres";
import { useGenre } from "../context/genre-context";

const ListingPage = () => {
	const params = useParams();
	const { topRated, popular } = useLoaderData();
	const { movieGenres, tvGenres } = useGenre();
	const mediaType = params.mediaType;
	const genres = mediaType === "movie" ? movieGenres : tvGenres;

	return (
		<>
			<CarouselList title={`Top Rated `} items={topRated}></CarouselList>
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
	const topRated = topRatedResponse.data.results;

	const popularResponse = await axios.get(
		mediaType === "movies"
			? requests.getPopularMovies
			: requests.getPopularTv
	);
	const popular = popularResponse.data.results;

	return { topRated, popular };
}

export default ListingPage;
