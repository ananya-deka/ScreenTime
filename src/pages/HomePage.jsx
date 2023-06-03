import requests from "../api/requests";
import axios from "../api/axios";
import Content from "../components/UI/Content";
import { useEffect, useState } from "react";

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
		<Content title={`Currently In Theatres`} section={currentlyPlaying} />
	);
};

export default HomePage;
