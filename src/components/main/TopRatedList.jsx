import classes from "./TopRatedList.module.css";

import Tile from "./tile";
import Carousel from "../Layout/Carousel";
import Header from "../UI/Header";

const TopRatedList = ({ title, items }) => {
	return (
		<section className={classes.group}>
			<Header>
				<h2>{title}</h2>
			</Header>

			<Carousel>
				{items.map((item) => (
					<div key={item.id} className={classes.item}>
						<Tile item={item} imgType={"poster"}>
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
