import requests from "../api/requests";
import axios from "../api/axios";
import { Navigate, useSearchParams } from "react-router-dom";
import List from "../components/main/List";
import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";

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

	async function getSearchResults(query, currentPage) {
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

	const debouncedGetSearchResults = useCallback(
		debounce(
			(query, currentPage) => getSearchResults(query, currentPage),
			1000
		),
		[]
	);

	useEffect(() => {
		debouncedGetSearchResults(query, currentPage);
		return () => {
			debouncedGetSearchResults.cancel();
		};
	}, [debouncedGetSearchResults, query, currentPage]);

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

export default SearchPage;
