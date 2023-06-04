import { forwardRef } from "react";
import classes from "./PlaylistMenu.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PlaylistMenu = forwardRef(
	({ video, display, createPlaylist, addToPlaylist }, ref) => {
		const playlists = useSelector((state) => state.playlist.playlists);
		const playlistNames = Object.keys(playlists);
		const params = useParams();

		let media_type = "movies";
		if (params.page === "tv") {
			media_type = "tv";
		}

		return (
			<menu
				className={`${classes.playlist__menu} ${
					!display ? classes.hidden : ""
				}`}
			>
				{playlistNames.map((playlist) => (
					<li
						key={playlist}
						className={`${classes.menu__items} ${classes.options} ${
							video.id in playlists[playlist][media_type]
								? classes.added
								: classes.not_added
						}`}
						onClick={addToPlaylist.bind(null, playlist)}
					>
						{playlist}
					</li>
				))}
				<li className={classes.menu__items}>
					<form className={classes.add} onSubmit={createPlaylist}>
						<input
							className={classes.new_playlist}
							type="text"
							name="playlist"
							placeholder="Create Playlist"
							ref={ref}
						/>
						<button className={classes.add_button}>+</button>
					</form>
				</li>
			</menu>
		);
	}
);

export default PlaylistMenu;
