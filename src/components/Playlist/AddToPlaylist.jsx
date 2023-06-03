import classes from "./AddToPlaylist.module.css";

import { useRef, useState } from "react";
import PlaylistButton from "./PlaylistButton";
import PlaylistMenu from "./PlaylistMenu";
import heartLogo from "../../assets/heart-filled.png";
import cancelLogo from "../../assets/cancel.png";
import { useParams } from "react-router-dom";

const tempPlaylist = {
	Watchlist: {
		name: "Watchlist",
		movies: {},
		tv: {},
	},
};

const AddToPlaylist = ({ video }) => {
	const [displayMenu, setDisplayMenu] = useState(false);
	const [logo, setLogo] = useState(heartLogo);
	const [playlists, setPlaylists] = useState(tempPlaylist);
	const inputRef = useRef();
	const params = useParams();

	function toggleDisplay() {
		setDisplayMenu((prev) => !prev);
		setLogo((prev) => (prev === heartLogo ? cancelLogo : heartLogo));
		inputRef.current.value = "";
		console.log(playlists);
	}

	function addPlaylistHandler(e) {
		e.preventDefault();
		const name = inputRef.current.value;
		if (name in playlists) {
			return;
		}

		let movies = {};
		let tv = {};

		if (params.page === "movie") {
			movies = {
				[video.id]: video,
			};
		} else {
			tv = {
				[video.id]: video,
			};
		}

		const new_playlist = {
			[name]: {
				name,
				movies,
				tv,
			},
		};

		setPlaylists((prev) => ({ ...prev, ...new_playlist }));
		toggleDisplay();
	}

	function addToPlaylistHandler(playlist) {
		if (params.page === "movie") {
			if (video.id in playlists[playlist].movies) return;

			setPlaylists((prev) => {
				let altered = { ...prev };
				const newEntry = {
					[video.id]: video,
				};

				let alteredPlaylist = altered[playlist];
				let alteredMovies = { ...alteredPlaylist.movies, ...newEntry };
				alteredPlaylist.movies = { ...alteredMovies };
				altered[playlist] = { ...alteredPlaylist };

				return altered;
			});
		} else {
			if (video.id in playlists[playlist][tv]) return;

			playlists[playlist][tv][video.id] = video;
		}
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
				addPlaylist={addPlaylistHandler}
			/>
		</div>
	);
};

export default AddToPlaylist;
