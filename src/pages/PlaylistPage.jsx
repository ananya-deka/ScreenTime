import { useSelector } from "react-redux";
import Playlist from "../components/Playlist/Playlist";
import Loader from "../components/UI/Loader";

const PlaylistPage = () => {
	const playlists = useSelector((state) => state.playlist.playlists);

	return (
		<>
			{Object.keys(playlists).map((key) => {
				const movies = playlists[key].movies
					? playlists[key].movies
					: {};
				const tv = playlists[key].tv ? playlists[key].tv : {};
				const videos = Object.values(movies).concat(Object.values(tv));

				return (
					<Playlist
						key={key}
						id={key}
						title={playlists[key].name}
						videos={videos}
					/>
				);
			})}
		</>
	);
};

export default PlaylistPage;
