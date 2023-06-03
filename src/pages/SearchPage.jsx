import requests from "../api/requests";
import axios from "../api/axios";
import { Navigate, useLoaderData, useSearchParams } from "react-router-dom";

import Content from "../components/UI/Content";

const SearchPage = () => {
	const { searchResults } = useLoaderData();
	const [params] = useSearchParams();
	const query = params.get("q");

	return query ? (
		<Content section={searchResults} />
	) : (
		<Navigate to="-1" replace />
	);
};

export async function loader({ request }) {
	const url = new URL(request.url);
	const query = url.searchParams.get("q");

	const response = await axios.get(`${requests.search}${query}`);
	const searchResults = response.data.results.filter(
		(media) => media.backdrop_path !== null && media.media_type !== "person"
	);

	return { searchResults };
}

export default SearchPage;
