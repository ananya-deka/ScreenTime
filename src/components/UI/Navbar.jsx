import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

import homeLogo from "../../assets/home-filled-svgrepo-com.svg";
import movieLogo from "../../assets/movie-play-button-svgrepo-com.svg";
import tvLogo from "../../assets/tv-free-2-svgrepo-com.svg";
import bookmarkLogo from "../../assets/bookmark-fill-svgrepo-com.svg";

const Navbar = () => {
	return (
		<div className={classes.navbar}>
			<ul className={classes.options}>
				<li className={classes.option}>
					<Link to={`/`}>
						<img
							className={classes.icon}
							height="40"
							width="40"
							src={homeLogo}
							alt="Home"
						/>
					</Link>
				</li>
				<li className={classes.option}>
					<Link to={`movies`}>
						<img
							className={classes.icon}
							height="30"
							width="30"
							src={movieLogo}
							alt="Movies"
						/>
					</Link>
				</li>
				<li className={classes.option}>
					<Link to={`tv`}>
						<img
							className={classes.icon}
							height="30"
							width="30"
							src={tvLogo}
							alt="TV Shows"
						/>
					</Link>
				</li>
				<li className={classes.option}>
					<img
						className={classes.icon}
						height="40"
						width="40"
						src={bookmarkLogo}
						alt="Bookmarks"
					/>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
