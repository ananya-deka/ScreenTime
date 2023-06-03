import classes from "./PlaylistButton.module.css";

const PlaylistButton = ({ logo, displayMenu }) => {
	return (
		<button onClick={displayMenu} className={classes.playlist__button}>
			<img
				className={classes.playlist__icon}
				src={logo}
				alt="Add to Wishlist"
				width="25"
				height="25"
			/>
		</button>
	);
};

export default PlaylistButton;
