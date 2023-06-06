import classes from "./Playlist.module.css";

import { deletePlaylist, removeFromPlaylist } from "../../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaylistContent from "./PlaylistContent";

const Playlist = ({ id, title, videos }) => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.playlist.updateStatus);
	function changeColor(e, color) {
		e.target.style.color = `{color}`;
	}

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

	return (
		<section className={classes.playlist}>
			{status === "loading" && <p>Please wait...</p>}
			<header className={classes.playlist__header}>
				<h2>{title}</h2>
				<button
					className={classes.delete_button}
					onClick={deletePlaylistHandler}
				>
					<i
						onMouseOver={(e) => changeColor(e, "red")}
						onMouseLeave={(e) => changeColor(e, "#ffffff")}
						className={"fa-solid fa-xmark"}
						style={{ color: "#ffffff", transition: "color 0.5s" }}
					></i>
				</button>
			</header>
			<div className={classes.playlist__content}>
				<PlaylistContent
					videos={videos}
					removeFromPlaylist={removeFromPlaylistHandler}
				/>
			</div>
		</section>
	);
};

export default Playlist;
