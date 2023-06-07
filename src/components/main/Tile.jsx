import classes from "./Tile.module.css";
import { imageBaseUrl as base } from "../../api/requests";
import fallbackImg from "../../assets/cinema-g4bbaeecd6_640.jpg";
import { Link } from "react-router-dom";

const Tile = ({ item, imgType, children }) => {
	function imageErrorHandler(e) {
		e.target.src = fallbackImg;
	}

	return (
		<div className={classes.tile}>
			<Link
				to={`/details/${item.media_type}/${item.id}`}
				state={{ target: item }}
			>
				<div>
					<img
						className={classes.thumbnail}
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
						alt={item.title || item.original_name}
					/>
				</div>
				{imgType === "backdrop" && <div>{children}</div>}
			</Link>
		</div>
	);
};

export default Tile;
