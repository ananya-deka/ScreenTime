import classes from "./Overview.module.css";
import AddToPlaylist from "../Playlist/AddToPlaylist";
import Header from "../UI/Header";
const Overview = ({ video }) => {
	const title = video.title || video.name;
	const overview = video.overview || "No overview available for this title.";
	const release_date = video.release_date || video.first_air_date || "N/A";

	console.log(video);
	return (
		<>
			<Header>
				<h2>{title}</h2>
			</Header>

			<p>{overview}</p>
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
				<li>
					{video.media_type === "movie"
						? "Release date: "
						: "First Aired On: "}
					{release_date}
				</li>
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
