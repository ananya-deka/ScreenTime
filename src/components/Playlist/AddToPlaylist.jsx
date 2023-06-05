import classes from "./AddToPlaylist.module.css";

import { useRef, useState } from "react";
import PlaylistButton from "./PlaylistButton";
import PlaylistMenu from "./PlaylistMenu";
import heartLogo from "../../assets/heart-filled.png";
import cancelLogo from "../../assets/cancel.png";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist, createPlaylist } from "../../redux/playlistSlice";

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

	async function createPlaylistHandler(e) {
		e.preventDefault();
		const name = inputRef.current.value;
		for (let key in playlists) {
			if (playlists[key].name === name) return;
		}

		await dispatch(
			createPlaylist({
				name,
				video,
				media_type: params.page,
			})
		).unwrap();
		inputRef.current.value = "";
	}

	async function addToPlaylistHandler(key) {
		if (
			(params.page === "movie" &&
				playlists[key].movies &&
				video.id in playlists[key].movies) ||
			(params.page === "tv" &&
				playlists[key].tv &&
				video.id in playlists[key].tv)
		) {
			return;
		}

		await dispatch(
			updatePlaylist({
				video,
				key,
				media_type: params.page,
			})
		).unwrap();
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
