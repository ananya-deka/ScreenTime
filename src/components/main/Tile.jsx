import classes from "./Tile.module.css";
import { imageBaseUrl as base } from "../../api/requests";
import fallbackImg from "../../assets/cinema-g4bbaeecd6_640.jpg";
import { Link } from "react-router-dom";

const Tile = (props) => {
	function imageErrorHandler(e) {
		e.target.src = fallbackImg;
	}

	return (
		<div className={classes.tile}>
			<Link
				to={`/details/${props.item.media_type}/${props.item.id}`}
				state={{ target: props.item }}
			>
				<div>
					<img
						className={classes.thumbnail}
						src={`${base}${props.item.backdrop_path}`}
						onError={imageErrorHandler}
						alt={props.item.title || props.item.original_name}
					/>
				</div>
				<div>{props.children}</div>
			</Link>
		</div>
	);
};

export default Tile;
