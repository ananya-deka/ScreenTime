import { forwardRef, CSSProperties, useState, useEffect } from "react";
import classes from "./PlaylistMenu.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";

const PlaylistMenu = forwardRef(
	({ display, createPlaylist, addToPlaylist, duplicateError }, ref) => {
		const [isLoading, setIsLoading] = useState(false);
		const playlists = useSelector((state) => state.playlist.playlists);
		const updateStatus = useSelector(
			(state) => state.playlist.updateStatus
		);

		const params = useParams();

		const media_type = params.page === "tv" ? "tv" : "movies";

		useEffect(() => {
			if (updateStatus === "loading") {
				setIsLoading(true);
			} else setIsLoading(false);
		}, [updateStatus]);

		return (
			<menu
				className={`${classes.playlist__menu} ${
					!display ? classes.hidden : ""
				}`}
			>
				<Loader loading={isLoading} />
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
							className={`${classes.new_playlist} ${
								duplicateError ? classes.error : null
							}`}
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
			</menu>
		);
	}
);

export default PlaylistMenu;
