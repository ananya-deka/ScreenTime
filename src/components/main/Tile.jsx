import classes from "./Tile.module.css";
import { imageBaseUrl as base } from "../../api/requests";
import fallbackImg from "../../assets/cinema-g4bbaeecd6_640.jpg";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const Tile = ({ item, imgType, children, deleteButton }) => {
	const [displayDelete, setDisplayDelete] = useState(false);
	const params = useParams();
	const mediaType = params.page
		? params.page
		: params.mediaType === "tv"
		? "tv"
		: "movie";

	function imageErrorHandler(e) {
		e.target.src = fallbackImg;
	}

	return (
		<div
			className={classes.tile}
			onMouseEnter={() => setDisplayDelete(true)}
			onMouseLeave={() => setDisplayDelete(false)}
		>
			<Link
				to={`/details/${item.media_type || mediaType}/${item.id}`}
				className={classes.target}
			>
				<div>
					<img
						className={classes.thumbnail}
						loading="lazy"
						src={`${base}${
							imgType === "poster"
								? item.poster_path
								: item.backdrop_path
						}`}
						style={{
							aspectRatio:
								imgType === "backdrop" ? "2/1" : "auto",
						}}
						onError={imageErrorHandler}
						alt={item.title || item.name}
					/>
				</div>
				{imgType === "backdrop" && (
					<div className={classes.innerbox}>{children}</div>
				)}
				{imgType === "poster" && deleteButton && (
					<div
						className={`${classes.overlay} ${
							!displayDelete ? classes.hidden : null
						}`}
					>
						<deleteButton.type
							{...deleteButton.props}
							item={item}
						></deleteButton.type>
					</div>
				)}
			</Link>
		</div>
	);
};

export default Tile;
