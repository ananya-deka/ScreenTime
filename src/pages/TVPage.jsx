import requests from "../api/requests";
import axios from "../api/axios";

import { useLoaderData } from "react-router-dom";
import TopRatedList from "../components/main/TopRatedList";
import List from "../components/main/List";

const TVPage = () => {
	const { topRatedTVShows, popularTVShows } = useLoaderData();
	return (
		<>
			<TopRatedList
				title={`Top Rated TV Shows`}
				items={topRatedTVShows}
			/>
			<List title={`Popular Right Now`} items={popularTVShows} />
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
