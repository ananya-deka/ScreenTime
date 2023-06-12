import classes from "./Details.module.css";

import { imageBaseUrl as base, imageBaseUrl } from "../../api/requests";
import Overview from "./Overview";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import requests from "../../api/requests";
import axios from "../../api/axios";
import profileFallback from "../../assets/profile.jpg";
import CarouselList from "./CarouselList";

const region = "IN";
const Details = ({ video }) => {
	const params = useParams();
	const [unavailableMessage, setUnavailableMessage] = useState("");
	const [streamingPlatforms, setStreamingPlatforms] = useState([]);
	const [recommendations, setRecommendations] = useState([]);
	const [cast, setCast] = useState([]);
	const mediaType = params.page;

	function imageErrorHandler(e) {
		e.target.src = profileFallback;
	}

	useEffect(() => {
		async function getStreamingPlatforms() {
			const response = await axios.get(
				mediaType === "movie"
					? requests.getMovieStreamingPlatforms(video.id)
					: requests.getTvStreamingPlatforms(video.id)
			);
			const data = await response.data;
			const platforms = data.results[region];
			const streamingPlatforms = platforms ? platforms.flatrate : [];

			if (!streamingPlatforms || streamingPlatforms.length === 0) {
				setUnavailableMessage("Not available on any platform");
			} else setUnavailableMessage("");
			setStreamingPlatforms(streamingPlatforms);
		}

		async function getCast() {
			const response = await axios.get(
				requests.getCredits(video.id, mediaType)
			);

			const data = await response.data;
			const cast = data.cast;
			setCast(cast.slice(0, 10));
		}

		async function getRecommendations() {
			const response = await axios.get(
				requests.getRecommendations(video.id, mediaType)
			);
			const data = response.data;

			setRecommendations(data.results);
		}

		getStreamingPlatforms();
		getCast();
		getRecommendations();
	}, [video.id, mediaType]);

	return (
		<div className={classes.details}>
			<div className={classes.info}>
				<img
					className={classes.poster}
					src={`${base}${video.poster_path}`}
					alt={video.original_title}
				/>

				<section className={classes.overview}>
					<Overview video={video} />
				</section>
			</div>
			<section className={classes.info_box}>
				<header className={classes.info__header}>
					<h2>Stream On</h2>
				</header>
				<ul className={classes.tiles}>
					{streamingPlatforms &&
						streamingPlatforms.map((platform) => (
							<li key={platform.provider_id}>
								<img
									src={`${imageBaseUrl}${platform.logo_path}`}
									alt={`${platform.provider_name}`}
									width={50}
									height={50}
								/>
							</li>
						))}
					<li>
						<p className={classes.unavailable}>
							{unavailableMessage}
						</p>
					</li>
				</ul>
			</section>

			{recommendations && recommendations.length > 0 && (
				<section className={classes.info_box}>
					<header className={classes.info__header}>
						<h2>You might also like</h2>
					</header>
					<CarouselList items={recommendations} />
				</section>
			)}
			{cast && cast.length > 0 && (
				<section className={classes.info_box}>
					<header className={classes.info__header}>
						<h2>Cast</h2>
					</header>
					<ul className={classes.cast}>
						{cast.map((member) => (
							<li
								className={classes.cast__member}
								key={member.id}
							>
								<img
									className={classes.cast__img}
									src={`${imageBaseUrl}${member.profile_path}`}
									alt={member.name}
									onError={imageErrorHandler}
								/>
								<div className={classes.cast_info}>
									<p>{member.name}</p>
									<small>{member.character}</small>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</div>
	);
};

export default Details;
