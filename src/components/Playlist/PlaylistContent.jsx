import classes from "./PlaylistContent.module.css";
import Tile from "../main/tile";

const PlaylistContent = ({ videos, removeFromPlaylist }) => {
	function changeColor(e, color) {
		e.target.style.color = `${color}`;
	}

	return (
		<>
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
								removeFromPlaylist(
									e,
									video.media_type,
									video.id
								)
							}
						>
							<i
								onMouseOver={(e) => changeColor(e, "red")}
								onMouseLeave={(e) => changeColor(e, "#ffffff")}
								className={"fa-solid fa-xmark"}
								style={{
									color: "#ffffff",
									transition: "color 0.5s",
								}}
							></i>
						</button>
					</div>
				</Tile>
			))}
		</>
	);
};

export default PlaylistContent;
