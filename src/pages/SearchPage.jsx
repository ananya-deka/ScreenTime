import requests from "../api/requests";
import axios from "../api/axios";
import { Navigate, useSearchParams } from "react-router-dom";
import List from "../components/main/List";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/UI/Loader";

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

			setSearchResults(
				currentPage === 1 ? results : [...searchResults, ...results]
			);
			setHasMore(currentPage !== response.data.total_pages);
		}

		const getResults = setTimeout(() => {
			getSearchResults();
		}, 300);

		return () => clearTimeout(getResults);
	}, [query, currentPage]);

	function fetchData() {
		setCurrentPage((current) => ++current);
	}

	return query ? (
		<InfiniteScroll
			dataLength={searchResults.length}
			next={fetchData}
			hasMore={hasMore}
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
