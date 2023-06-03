import requests from "../api/requests";
import axios from "../api/axios";

import Content from "../components/UI/Content";
import { useLoaderData } from "react-router-dom";

const TVPage = () => {
	const { topRatedTVShows, popularTVShows } = useLoaderData();
	return (
		<>
			<Content title={`Top Rated`} carousel={topRatedTVShows} />
			<Content title={`Popular Right Now`} section={popularTVShows} />
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
