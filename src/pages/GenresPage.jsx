import { useParams } from "react-router-dom";
import List from "../components/main/List";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import { useGenre } from "../context/genre-context";
import InfiniteScroll from "react-infinite-scroll-component";

const GenresPage = () => {
	const params = useParams();
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const mediaType = params.page;
	const genreId = params.genreId;

	useEffect(() => {
		setCurrentPage(1);
	}, [mediaType, genreId]);

	useEffect(() => {
		async function getItems() {
			let request = "";

			switch (mediaType) {
				case "movie":
					request =
						genreId === "popular"
							? `${requests.getPopularMovies}&page=${currentPage}`
							: genreId === "toprated"
							? `${requests.getTopRatedMovies}&page=${currentPage}`
							: `${requests.getMovieByGenre}${genreId}&page=${currentPage}`;
					break;
				case "tv":
					request =
						genreId === "popular"
							? `${requests.getPopularTv}&page=${currentPage}`
							: genreId === "toprated"
							? `${requests.getTopRatedTv}&page=${currentPage}`
							: `${requests.getTvByGenre}${genreId}&page=${currentPage}`;
					break;
			}
			const response = await axios.get(request);
			const data = await response.data;
			const results = data.results.map((result) => ({
				...result,
				media_type: mediaType,
			}));

			setItems((items) =>
				currentPage === 1 ? results : [...items, ...results]
			);

			setHasMore(data.total_pages !== currentPage);

			return response;
		}

		getItems();
	}, [currentPage, mediaType, genreId]);

	function fetchData() {
		setCurrentPage((current) => ++current);
	}

	return (
		<>
			<InfiniteScroll
				dataLength={items.length}
				next={fetchData}
				hasMore={hasMore}
			>
				<List items={items} expanded={true} />
			</InfiniteScroll>
		</>
	);
};

export default GenresPage;
