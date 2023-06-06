import classes from "./Section.module.css";
import Tile from "./tile";
import { useEffect } from "react";
const Section = ({ items }) => {
	return (
		<section className={classes.section}>
			<header className={classes.section__header}>
				<h2>Top Rated Movies</h2>
			</header>
			<div className={classes.group}>
				{items.map((item) => (
					<Tile key={item.id} item={item}>
						<div className={classes.details}>
							<p className={classes.year}>
								<small>
									{new Date(
										item.release_date || item.first_air_date
									).getFullYear()}
								</small>
							</p>
							<p>{item.title || item.original_name}</p>
						</div>
					</Tile>
				))}
			</div>
		</section>
	);
};

export default Section;
