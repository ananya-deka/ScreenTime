import classes from "./Overview.module.css";
import AddToPlaylist from "../Playlist/AddToPlaylist";
import Header from "../UI/Header";
import { Link } from "react-router-dom";
import goldStar from "../../assets/gold-star.svg";

const Overview = ({ video }) => {
	const title = video.title || video.name;
	const overview = video.overview || "No overview available for this title.";
	const release_date = video.release_date || video.first_air_date || "N/A";
	return (
		<>
			<Header>
				<h2>{title}</h2>
			</Header>
			<div className={classes.rating}>
				{video.vote_average.toFixed(1)}/10
				<img src={goldStar} width={16} height={16} />
			</div>
			<em>{video.tagline}</em>

			<p>{overview}</p>
			<ul className={classes.genres}>
				{video.genres.map((genre) => (
					<li
						key={genre.id}
						className={`${classes.inline} ${classes.genre}`}
					>
						<Link
							to={`/browse/genres/${video.media_type}/${genre.id}`}
						>
							{genre.name}
						</Link>
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
					{!video.spoken_languages ||
						(video.spoken_languages.length === 0 &&
							"Languages: N/A")}
					{video.spoken_languages &&
						video.spoken_languages.length > 0 &&
						"Languages: "}
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
