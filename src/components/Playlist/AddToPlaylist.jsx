import classes from "./AddToPlaylist.module.css";

import { useRef, useState } from "react";
import PlaylistButton from "./PlaylistButton";
import PlaylistMenu from "./PlaylistMenu";
import heartLogo from "../../assets/heart-filled.png";
import cancelLogo from "../../assets/cancel.png";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlaylist, addToPlaylist } from "../../redux/playlistSlice";

const AddToPlaylist = ({ video }) => {
	const [displayMenu, setDisplayMenu] = useState(false);
	const [logo, setLogo] = useState(heartLogo);
	const inputRef = useRef();
	const params = useParams();
	const playlists = useSelector((state) => state.playlist.playlists);
	const dispatch = useDispatch();

	function toggleDisplay() {
		setDisplayMenu((prev) => !prev);
		setLogo((prev) => (prev === heartLogo ? cancelLogo : heartLogo));
		inputRef.current.value = "";
	}

	function createPlaylistHandler(e) {
		e.preventDefault();
		const name = inputRef.current.value;
		if (name in playlists) {
			return;
		}

		dispatch(
			createPlaylist({
				name,
				video,
				media_type: params.page,
			})
		);

		toggleDisplay();
	}

	function addToPlaylistHandler(playlist) {
		if (
			(params.page === "movie" &&
				video.id in playlists[playlist].movies) ||
			(params.page === "tv" && video.id in playlists[playlist].tv)
		) {
			return;
		}

		dispatch(
			addToPlaylist({
				video,
				playlist,
				media_type: params.page,
			})
		);
	}

	return (
		<div className={classes.playlist}>
			<PlaylistButton logo={logo} displayMenu={toggleDisplay} />
			<PlaylistMenu
				video={video}
				display={displayMenu}
				addToPlaylist={addToPlaylistHandler}
				playlists={playlists}
				ref={inputRef}
				createPlaylist={createPlaylistHandler}
			/>
		</div>
	);
};

export default AddToPlaylist;
