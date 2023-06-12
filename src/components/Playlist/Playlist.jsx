import classes from "./Playlist.module.css";

import { deletePlaylist, removeFromPlaylist } from "../../redux/playlistSlice";
import { useDispatch } from "react-redux";
import DeleteButton from "../UI/DeleteButton";
import CarouselList from "../main/CarouselList";

const Playlist = ({ id, title, videos }) => {
	const dispatch = useDispatch();
	async function deletePlaylistHandler() {
		await dispatch(
			deletePlaylist({
				key: id,
			})
		).unwrap();
	}

	async function removeFromPlaylistHandler(e, media_type, videoKey) {
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
		<div
			style={{ display: "flex", gap: "1rem", textTransform: "uppercase" }}
		>
			{title}
			<DeleteButton removeItem={deletePlaylistHandler} />
		</div>
	);

	return (
		<section className={classes.playlist}>
			<CarouselList
				items={videos}
				title={header}
				removeFromPlaylist={removeFromPlaylistHandler}
				deleteButton={
					<DeleteButton removeItem={removeFromPlaylistHandler} />
				}
				expanded={true}
			/>
			{videos.length === 0 && (
				<div className={classes.empty}>Nothing to show here.</div>
			)}
		</section>
	);
};

export default Playlist;
