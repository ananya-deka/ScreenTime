import classes from "./Carousel.module.css";

import Tile from "./tile";

const Carousel = ({ movies }) => {
	return (
		<div className={classes.carousel}>
			{movies.map((movie) => (
				<Tile key={movie.id} movie={movie}>
					<div className={classes.details}>
						<p>
							{new Date(
								movie.release_date || movie.first_air_date
							).getFullYear()}
						</p>
						<p className={classes.title}>
							{movie.title || movie.original_name}
						</p>
					</div>
				</Tile>
			))}
		</div>
	);
};

export default Carousel;
