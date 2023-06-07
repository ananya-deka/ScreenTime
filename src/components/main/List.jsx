import Grid from "../Layout/Grid";
import Header from "../UI/Header";
import classes from "./List.module.css";
import Tile from "./tile";
import DetailsBox from "../UI/DetailBox";
import { Link } from "react-router-dom";
import { useState } from "react";

const List = ({ title, items, deleteButton, expanded, id, media_type }) => {
	const [expandVisible, setExpandVisible] = useState(false);
	const displayedItems = expanded ? items : items.slice(10);

	return (
		<section className={classes.list}>
			<Header>
				<div
					onMouseEnter={() => setExpandVisible(true)}
					onMouseLeave={() => setExpandVisible(false)}
				>
					<h2>{title}</h2>
					{!expanded && expandVisible && (
						<p className={classes.expand}>
							<Link
								to={`/genres/${media_type}/${id}`}
								state={{ items, title }}
							>
								See All...
							</Link>
						</p>
					)}
				</div>
			</Header>

			<Grid>
				{displayedItems.map((item) => (
					<div key={item.id} className={classes.item}>
						<Tile item={item} imgType={"backdrop"}>
							<DetailsBox>
								<div className={classes.details}>
									<p className={classes.year}>
										<small>
											{new Date(
												item.release_date ||
													item.first_air_date
											).getFullYear()}
										</small>
									</p>
									<p>{item.title || item.original_name}</p>
								</div>
								{deleteButton && (
									<deleteButton.type
										{...deleteButton.props}
										item={item}
									></deleteButton.type>
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
