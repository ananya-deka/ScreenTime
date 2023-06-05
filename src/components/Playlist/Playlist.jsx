import classes from "./Playlist.module.css";

import Tile from "../main/tile";
import { deletePlaylist, removeFromPlaylist } from "../../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

	function setRed(e) {
		e.target.style.color = "red";
	}

	function resetColor(e) {
		e.target.style.color = "#ffffff";
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
						onMouseOver={setRed}
						onMouseLeave={resetColor}
						class="fa-solid fa-xmark"
						style={{ color: "#ffffff", transition: "color 0.5s" }}
					></i>
				</button>
			</header>
			<div className={classes.playlist__content}>
				{videos.map((video) => (
					<Tile key={video.id} movie={video}>
						<div className={classes.info_box}>
							<div className={classes.details}>
								<p className={classes.year}>
									<small>
										{new Date(
											video.release_date ||
												video.first_air_date
										).getFullYear()}
									</small>
								</p>
								<p>{video.title || video.original_name}</p>
							</div>
							<button
								className={classes.remove_button}
								onClick={(e) =>
									removeFromPlaylistHandler(
										e,
										video.media_type,
										video.id
									)
								}
							>
								<i
									onMouseOver={setRed}
									onMouseLeave={resetColor}
									class="fa-solid fa-xmark"
									style={{
										color: "#ffffff",
										transition: "color 0.5s",
									}}
								></i>
							</button>
						</div>
					</Tile>
				))}
			</div>
		</section>
	);
};

export default Playlist;
