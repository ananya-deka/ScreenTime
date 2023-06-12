import classes from "./CarouselList.module.css";

import Tile from "./Tile";
import Carousel from "../Layout/Carousel";
import Header from "../UI/Header";
import { useParams } from "react-router-dom";
import ExpandableHeader from "./ExpandableHeader";

const CarouselList = ({
	title,
	items,
	removeFromPlaylist,
	deleteButton,
	expanded,
}) => {
	const params = useParams();

	return (
		<section className={classes.group}>
			{expanded && (
				<ExpandableHeader
					title={title}
					mediaType={params.mediaType === "movies" ? "movie" : "tv"}
				/>
			)}
			{!expanded && (
				<Header>
					<h3>{title}</h3>
				</Header>
			)}
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

export default CarouselList;
