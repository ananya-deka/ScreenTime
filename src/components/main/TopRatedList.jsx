import classes from "./TopRatedList.module.css";

import Tile from "./tile";
import Carousel from "../Layout/Carousel";

const TopRatedList = ({ items }) => {
	return (
		<section className={classes.group}>
			<header className={classes.group__header}>
				<h2>Top Rated Movies</h2>
			</header>
			<Carousel>
				{items.map((item) => (
					<div key={item.id} className={classes.item}>
						<Tile item={item}>
							<div className={classes.details}>
								<p>
									{new Date(
										item.release_date || item.first_air_date
									).getFullYear()}
								</p>
								<p className={classes.title}>
									{item.title || item.original_name}
								</p>
							</div>
						</Tile>
					</div>
				))}
			</Carousel>
		</section>
	);
};

export default TopRatedList;
