import classes from "./TopRatedList.module.css";

import Tile from "./Tile";
import Carousel from "../Layout/Carousel";
import Header from "../UI/Header";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const TopRatedList = ({
	title,
	items,
	removeFromPlaylist,
	deleteButton,
	expanded,
}) => {
	const [expandVisible, setExpandVisible] = useState(false);
	const params = useParams();

	return (
		<section className={classes.group}>
			<Header>
				<div
					onMouseEnter={() => setExpandVisible(true)}
					onMouseLeave={() => setExpandVisible(false)}
					className={classes.title}
				>
					<h3>{title}</h3>
					<div>
						{!expanded && expandVisible && (
							<p className={classes.expanded}>
								<Link
									to={`/browse/genres/${
										params.mediaType === "movies"
											? "movie"
											: "tv"
									}/toprated`}
								>
									See All...
								</Link>
							</p>
						)}
					</div>
				</div>
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
