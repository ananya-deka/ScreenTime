import { useLoaderData } from "react-router-dom";
import requests from "../api/requests";
import axios from "../api/axios";
import Details from "../components/main/Details";

const DetailsPage = () => {
	const { video } = useLoaderData();
	return <Details video={video} />;
};

export async function loader({ params }) {
	const media_type = params.page;
	const id = params.id;

	let request;
	if (media_type === "movie") {
		request = `${requests.getMovieDetails}${id}`;
	} else {
		request = `${requests.getTvDetails}${id}`;
	}

	const response = await axios.get(request);
	const video = response.data;
	video.media_type = media_type;

	return { video };
}

export default DetailsPage;
