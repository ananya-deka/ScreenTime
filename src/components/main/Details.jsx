import classes from "./Details.module.css";

import { imageBaseUrl as base } from "../../api/requests";
import Overview from "./Overview";

const Details = ({ video }) => {
	return (
		<div className={classes.details}>
			<img
				className={classes.poster}
				src={`${base}${video.poster_path}`}
				alt={video.original_title}
			/>

			<section className={classes.overview}>
				<Overview video={video} />
			</section>
		</div>
	);
};

export default Details;
