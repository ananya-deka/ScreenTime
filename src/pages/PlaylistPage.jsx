import { useSelector } from "react-redux";
import Content from "../components/UI/Content";
import Playlist from "../components/Playlist/Playlist";

const PlaylistPage = () => {
	const playlists = useSelector((state) => state.playlist.playlists);
	return (
		<>
			{Object.keys(playlists).map((key) => {
				const movies = playlists[key].movies
					? playlists[key].movies
					: {};
				const tv = playlists[key].tv ? playlists[key].tv : {};
				console.log(movies);
				const videos = Object.values(movies).concat(Object.values(tv));

				// return <Content title={playlists[key].name} section={videos} />;
				return <Playlist title={playlists[key].name} videos={videos} />;
			})}
		</>
	);
};

export default PlaylistPage;
