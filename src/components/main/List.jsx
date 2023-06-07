import Grid from "../Layout/Grid";
import Header from "../UI/Header";
import classes from "./List.module.css";
import Tile from "./tile";
import DetailsBox from "../UI/DetailBox";

const List = ({ title, items, deleteButton }) => {
	return (
		<section className={classes.list}>
			<Header>
				<h2>{title}</h2>
			</Header>
			<Grid>
				{items.map((item) => (
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
