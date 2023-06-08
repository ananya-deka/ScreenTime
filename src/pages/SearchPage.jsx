import requests from "../api/requests";
import axios from "../api/axios";
import { Navigate, useLoaderData, useSearchParams } from "react-router-dom";
import List from "../components/main/List";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [params] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const query = params.get("q");

	useEffect(() => {
		setCurrentPage(1);
		setHasMore(true);
	}, [query]);

	useEffect(() => {
		async function getSearchResults() {
			const response = await axios.get(
				`${requests.search}${query}&page=${currentPage}`
			);
			const results = response.data.results.filter(
				(media) => media.media_type !== "person"
			);

			setSearchResults((current) =>
				currentPage === 1 ? results : [...searchResults, ...results]
			);
			setHasMore(currentPage !== response.data.total_pages);
		}

		getSearchResults();
	}, [query, currentPage]);

	function fetchData() {
		setCurrentPage((current) => ++current);
	}

	return query ? (
		<InfiniteScroll
			dataLength={searchResults.length}
			next={fetchData}
			hasMore={hasMore}
			loader={<h4>Loading...</h4>}
		>
			<List items={searchResults} expanded={true}></List>
		</InfiniteScroll>
	) : (
		<Navigate to="/" replace />
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
