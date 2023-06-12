import Grid from "../Layout/Grid";
import Header from "../UI/Header";
import classes from "./List.module.css";
import Tile from "./Tile";
import DetailsBox from "../UI/DetailBox";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const List = ({ title, items, deleteButton, id }) => {
	const [expandVisible, setExpandVisible] = useState(false);
	const params = useParams();
	const mediaType = params.page
		? params.page
		: params.mediaType === "tv"
		? "tv"
		: "movie";

	const expanded = params.mediaType ? false : true;
	const displayedItems = expanded ? items : items.slice(0, 8);

	function handleMouseEnter() {
		if (!expanded) {
			setExpandVisible(true);
		}
	}

	function handleMouseLeave() {
		if (!expanded) {
			setExpandVisible(false);
		}
	}

	return (
		<section className={classes.list}>
			<Header>
				<div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={classes.title}
				>
					<h3>{title}</h3>
					<div>
						{expandVisible && (
							<p className={classes.expanded}>
								<Link to={`/browse/genres/${mediaType}/${id}`}>
									See All...
								</Link>
							</p>
						)}
					</div>
				</div>
			</Header>
			{items.length === 0 && (
				<div className={classes.empty}>Nothing to display here</div>
			)}
			<Grid grid={displayedItems.length > 6}>
				{displayedItems.map((item) => (
					<div key={item.id} className={classes.item}>
						<Tile item={item} imgType={"backdrop"}>
							<DetailsBox item={item}>
								{deleteButton && (
									<deleteButton.type
										{...deleteButton.props}
										item={item}
									/>
								)}
							</DetailsBox>
						</Tile>
					</div>
				))}
			</Grid>
		</section>
	);
};

export default List;
