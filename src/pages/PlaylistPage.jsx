import { useSelector } from "react-redux";
import Content from "../components/UI/Content";

const PlaylistPage = () => {
	const playlists = useSelector((state) => state.playlist.playlists);
	const playlistNames = Object.keys(playlists);

	return (
		<>
			{playlistNames.map((playlist) => {
				const movies = playlists[playlist].movies;
				const tv = playlists[playlist].tv;
				let videos = [];

				if (movies) {
					for (let key in movies) {
						videos.push(movies[key]);
					}
				}

				if (tv) {
					for (let key in tv) {
						videos.push(tv[key]);
					}
				}

				return (
					<Content key={playlist} title={playlist} section={videos} />
				);
			})}
		</>
	);
};

export default PlaylistPage;
