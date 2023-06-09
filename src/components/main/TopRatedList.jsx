import classes from "./TopRatedList.module.css";

import Tile from "./tile";
import Carousel from "../Layout/Carousel";
import Header from "../UI/Header";

const TopRatedList = ({ title, items, removeFromPlaylist, deleteButton }) => {
	return (
		<section className={classes.group}>
			<Header>
				<h2>{title}</h2>
			</Header>
			<Carousel>
				{items.map(
					(item) =>
						item.poster_path && (
							<div key={item.id} className={classes.item}>
								<Tile
									item={item}
									imgType={"poster"}
									removeFromPlaylist={removeFromPlaylist}
									deleteButton={deleteButton}
								></Tile>
							</div>
						)
				)}
			</Carousel>
		</section>
	);
};

export default TopRatedList;
