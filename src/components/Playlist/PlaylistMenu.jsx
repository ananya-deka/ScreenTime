import { forwardRef } from "react";
import classes from "./PlaylistMenu.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PlaylistMenu = forwardRef(
	({ display, createPlaylist, addToPlaylist }, ref) => {
		const playlists = useSelector((state) => state.playlist.playlists);
		const updateStatus = useSelector(
			(state) => state.playlist.updateStatus
		);

		const params = useParams();

		const media_type = params.page === "tv" ? "tv" : "movies";

		return (
			<menu
				className={`${classes.playlist__menu} ${
					!display ? classes.hidden : ""
				}`}
			>
				{Object.keys(playlists).map((key) => (
					<li
						key={key}
						className={`${classes.menu__items} ${classes.options} ${
							playlists[key][media_type] &&
							playlists[key][media_type][params.id]
								? classes.added
								: classes.not_added
						}`}
						onClick={addToPlaylist.bind(null, key)}
					>
						{playlists[key].name}
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
						<button
							disabled={updateStatus === "loading"}
							className={classes.add_button}
						>
							+
						</button>
					</form>
				</li>
				{updateStatus === "loading" && (
					<li className={`${classes.menu__items} ${classes.options}`}>
						Please Wait...
					</li>
				)}
			</menu>
		);
	}
);

export default PlaylistMenu;
