import requests from "../api/requests";
import axios from "../api/axios";
import { Navigate, useSearchParams } from "react-router-dom";
import List from "../components/main/List";
import { useMemo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import { useCallback } from "react";

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

	const getSearchResults = useCallback(async (query, currentPage) => {
		const response = await axios.get(
			`${requests.search}${query}&page=${currentPage}`
		);
		const results = response.data.results.filter(
			(media) => media.media_type !== "person"
		);

		setSearchResults((prev) =>
			currentPage === 1 ? results : [...prev, ...results]
		);
		setHasMore(currentPage !== response.data.total_pages);
	}, []);

	const debouncedGetSearchResults = useMemo(
		() =>
			debounce(
				(query, currentPage) => getSearchResults(query, currentPage),
				1000
			),
		[getSearchResults]
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
