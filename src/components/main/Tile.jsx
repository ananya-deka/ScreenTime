import classes from "./Tile.module.css";
import { imageBaseUrl as base } from "../../api/requests";
import fallbackImg from "../../assets/cinema-g4bbaeecd6_640.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Tile = (props) => {
	const [showDetails, setShowDetails] = useState(false);

	function imageErrorHandler(e) {
		e.target.src = fallbackImg;
	}
	return (
		<div
			className={classes.tile}
			onMouseEnter={() => {
				setShowDetails(true);
			}}
			onMouseLeave={() => {
				setShowDetails(false);
			}}
		>
			<Link
				to={`/details/${props.movie.media_type}/${props.movie.id}`}
				state={{ target: props.movie }}
			>
				<div>
					<img
						className={classes.thumbnail}
						src={`${base}${props.movie.backdrop_path}`}
						onError={imageErrorHandler}
						alt={props.movie.title || props.movie.original_name}
					/>
				</div>
				{/* {showDetails && <div>{props.children}</div>} */}
				<div>{props.children}</div>
			</Link>
		</div>
	);
};

export default Tile;
