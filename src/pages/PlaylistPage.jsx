import { useSelector } from "react-redux";
import Playlist from "../components/Playlist/Playlist";

const PlaylistPage = () => {
	const playlists = useSelector((state) => state.playlist.sortedPlaylists);

	return (
		<>
			{playlists.map((playlist) => (
				<Playlist
					key={playlist.key}
					id={playlist.key}
					title={playlist.name}
					videos={playlist.sortedItems}
				/>
			))}
		</>
	);
};

export default PlaylistPage;
