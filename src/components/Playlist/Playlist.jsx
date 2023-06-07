import classes from "./Playlist.module.css";

import { deletePlaylist, removeFromPlaylist } from "../../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import List from "../main/List";
import DeleteButton from "../UI/DeleteButton";

const Playlist = ({ id, title, videos }) => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.playlist.updateStatus);

	async function deletePlaylistHandler() {
		await dispatch(
			deletePlaylist({
				key: id,
			})
		).unwrap();
	}

	async function removeFromPlaylistHandler(e, media_type, videoKey) {
		console.log("here");
		e.preventDefault();
		media_type = media_type === "tv" ? media_type : "movies";
		await dispatch(
			removeFromPlaylist({
				videoKey,
				media_type,
				playlistKey: id,
			})
		).unwrap();
	}

	const header = (
		<div style={{ display: "flex", gap: "1rem" }}>
			{title}
			<DeleteButton removeItem={deletePlaylistHandler} />
		</div>
	);

	return (
		<section className={classes.playlist}>
			{status === "loading" && <p>Please wait...</p>}
			<List
				items={videos}
				title={header}
				removeFromPlaylist={removeFromPlaylistHandler}
				deleteButton={
					<DeleteButton removeItem={removeFromPlaylistHandler} />
				}
			/>
		</section>
	);
};

export default Playlist;
