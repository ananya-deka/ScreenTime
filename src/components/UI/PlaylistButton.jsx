import classes from "./PlaylistButton.module.css";

const PlaylistButton = ({ logo, displayMenu }) => {
	return (
		<div>
			<button onClick={displayMenu} className={classes.playlist__button}>
				Add to Playlist
				<img
					className={classes.playlist__icon}
					src={logo}
					alt="Add to Wishlist"
					width="25"
					height="25"
				/>
			</button>
		</div>
	);
};

export default PlaylistButton;
