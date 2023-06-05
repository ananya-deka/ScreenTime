import classes from "./Playlist.module.css";

import Tile from "../main/tile";

const Playlist = ({ title, videos }) => {
	return (
		<section className={classes.playlist}>
			<header className={classes.playlist__header}>
				<h2>{title}</h2>
				<i class="fa-solid fa-xmark" style={{ color: "#ffffff" }}></i>
			</header>
			<div className={classes.playlist__content}>
				{videos.map((video) => (
					<Tile key={video.id} movie={video}>
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
					</Tile>
				))}
			</div>
		</section>
	);
};

export default Playlist;
