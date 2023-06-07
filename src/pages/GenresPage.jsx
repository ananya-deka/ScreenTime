import { useLocation, useParams } from "react-router-dom";
import List from "../components/main/List";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import { useGenre } from "../context/genre-context";

const GenresPage = () => {
	const location = useLocation();
	const state = location.state;
	const params = useParams();
	const media_type = params.page;
	const genreId = params.genreId;
	const [items, setItems] = useState([]);
	const [title, setTitle] = useState("");
	const { movieGenres, tvGenres } = useGenre();

	useEffect(() => {
		async function getItems() {
			const response =
				media_type === "movie"
					? await axios.get(`${requests.getMovieByGenre}${genreId}`)
					: await axios.get(`${requests.getTvByGenre}${genreId}`);
			const data = await response.data;

			const results = data.results.map((result) => ({
				...result,
				media_type,
			}));

			setItems(results);
			return response;
		}

		if (!state || !state.items) {
			getItems();
			setTitle(
				media_type === "movie"
					? movieGenres.find((genre) => genre.id === +genreId).name
					: tvGenres.find((genre) => genre.id === +genreId).name
			);
		} else {
			setItems(state.items);
			setTitle(state.title);
		}
	}, [params]);

	return <List title={title} items={items} expanded={true} />;
};

export default GenresPage;
