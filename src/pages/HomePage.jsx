import requests from "../api/requests";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import List from "../components/main/List";

const HomePage = () => {
	const [currentlyPlaying, setCurrentlyPlaying] = useState([]);

	useEffect(() => {
		async function loadCurrentlyPlaying() {
			const response = await axios.get(requests.getCurrentlyPlaying);
			const data = response.data.results;
			let modified = [];

			data.forEach((entry) => {
				modified.push({ ...entry, media_type: "movie" });
			});
			setCurrentlyPlaying(modified);

			return response;
		}

		loadCurrentlyPlaying();
	}, []);

	return (
		<List
			title={`Currently In Theatres`}
			items={currentlyPlaying}
			expanded={true}
		/>
	);
};

export default HomePage;
