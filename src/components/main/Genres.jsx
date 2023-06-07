import { useEffect, useState } from "react";
import classes from "./Genres.module.css";
import requests from "../../api/requests";
import axios from "../../api/axios";
import List from "./List";

const Genres = ({ genreId, media_type, name }) => {
	const [items, setItems] = useState([]);

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

		getItems();
	}, []);

	return (
		<>
			{items.length > 0 ? (
				<List
					title={name}
					media_type={media_type}
					items={items}
					id={genreId}
					expanded={false}
				/>
			) : null}
		</>
	);
};

export default Genres;
