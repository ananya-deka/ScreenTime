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
	const [title, setTitle] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const mediaType = params.page;
	const genreId = params.genreId;
	const { movieGenres, tvGenres } = useGenre();

	useEffect(() => {
		setCurrentPage(1);

		if (
			movieGenres.length > 0 &&
			tvGenres.length > 0 &&
			genreId !== "popular"
		) {
			setTitle(
				mediaType === "movie"
					? movieGenres.find((genre) => genre.id === +genreId).name
					: tvGenres.find((genre) => genre.id === +genreId).name
			);
		}
	}, [movieGenres, tvGenres, mediaType, genreId]);

	useEffect(() => {
		async function getItems() {
			const response =
				mediaType === "movie"
					? genreId === "popular"
						? await axios.get(
								`${requests.getPopularMovies}&page=${currentPage}`
						  )
						: await axios.get(
								`${requests.getMovieByGenre}${genreId}&page=${currentPage}`
						  )
					: genreId === "popular"
					? await axios.get(
							`${requests.getPopularTv}&page=${currentPage}`
					  )
					: await axios.get(
							`${requests.getTvByGenre}${genreId}&page=${currentPage}`
					  );
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
				<List title={title} items={items} expanded={true} />
			</InfiniteScroll>
		</>
	);
};

export default GenresPage;
