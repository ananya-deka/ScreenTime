import classes from "./DetailsBox.module.css";

const DetailsBox = ({ item, children }) => {
	return (
		<section className={classes.details_box}>
			<div>
				<p className={classes.year}>
					<small>
						{(item.release_date || item.first_air_date) &&
							new Date(
								item.release_date || item.first_air_date
							).getFullYear()}
					</small>
				</p>
				<p>{item.title || item.name}</p>
			</div>

			{children}
		</section>
	);
};

export default DetailsBox;
