import { useSelector } from "react-redux";
import Playlist from "../components/Playlist/Playlist";

const PlaylistPage = () => {
	const playlists = useSelector((state) => state.playlist.playlists);

	return (
		<>
			{Object.keys(playlists).map((key) => {
				const movies = playlists[key].movies
					? Object.entries(playlists[key].movies || {})
					: {};

				const tv = playlists[key].tv
					? Object.entries(playlists[key].tv || {})
					: {};
				const videos = Object.values(movies).concat(Object.values(tv));

				videos.sort(
					(a, b) =>
						new Date(b[1].creation_time) -
						new Date(a[1].creation_time)
				);

				const sortedVideos = videos.map((video) => video[1].video);

				return (
					<Playlist
						key={key}
						id={key}
						title={playlists[key].name}
						videos={sortedVideos}
					/>
				);
			})}
		</>
	);
};

export default PlaylistPage;
