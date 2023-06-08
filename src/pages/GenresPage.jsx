import { useNavigate, useParams } from "react-router-dom";
import List from "../components/main/List";
import { useContext, useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import { useGenre } from "../context/genre-context";
import InfiniteScroll from "react-infinite-scroll-component";

const GenresPage = () => {
	const params = useParams();
	const [items, setItems] = useState([]);
	const [title, setTitle] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const media_type = params.page;
	const genreId = params.genreId;
	const { movieGenres, tvGenres } = useGenre();

	useEffect(() => {
		setCurrentPage(1);
		setItems([]);
		if (genreId === "popular") {
			setTitle("Popular Right Now");
		} else {
			setTitle(
				media_type === "movie"
					? movieGenres.find((genre) => genre.id === +genreId).name
					: tvGenres.find((genre) => genre.id === +genreId).name
			);
		}
		console.log(movieGenres, genreId);
	}, [media_type, genreId]);

	useEffect(() => {
		async function getItems() {
			console.log(currentPage);

			const response =
				media_type === "movie"
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
				media_type,
			}));

			setItems((items) =>
				currentPage === 1 ? results : [...items, ...results]
			);
			return response;
		}

		getItems();
	}, [currentPage]);

	function fetchData() {
		setCurrentPage((current) => ++current);
	}

	return (
		<>
			<InfiniteScroll
				dataLength={items.length}
				next={fetchData}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				<List title={title} items={items} expanded={true} />
			</InfiniteScroll>
		</>
	);
};

export default GenresPage;
