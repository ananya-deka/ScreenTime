import classes from "./Section.module.css";
import Tile from "./tile";

const Section = ({ movies }) => {
	return (
		<div className={classes.section}>
			{movies.map((movie) => (
				<Tile key={movie.id} movie={movie}>
					<div className={classes.details}>
						<p className={classes.year}>
							<small>
								{new Date(
									movie.release_date || movie.first_air_date
								).getFullYear()}
							</small>
						</p>
						<p>{movie.title || movie.original_name}</p>
					</div>
				</Tile>
			))}
		</div>
	);
};

export default Section;
