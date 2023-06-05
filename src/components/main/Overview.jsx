import classes from "./Overview.module.css";
import AddToPlaylist from "../Playlist/AddToPlaylist";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Overview = ({ video }) => {
	const tv = useSelector((state) => state.playlist.tv);
	const params = useParams();

	return (
		<>
			<header className={classes.header}>
				<h2>{video.title || video.original_name}</h2>
			</header>
			<p>{video.overview}</p>
			<ul className={classes.genres}>
				{video.genres.map((genre) => (
					<li
						key={genre.id}
						className={`${classes.inline} ${classes.genre}`}
					>
						{genre.name}
					</li>
				))}
			</ul>
			<AddToPlaylist video={video} />

			<ul className={classes.info}>
				<li>Released date: {video.release_date}</li>
				<li className={classes.inline}>
					Languages:
					<ul className={classes.inline}>
						{video.spoken_languages.map((lang, idx) => (
							<li
								className={`${classes.inline} ${classes.language}`}
								key={idx}
							>
								{lang.english_name}
							</li>
						))}
					</ul>
				</li>
			</ul>
		</>
	);
};

export default Overview;
