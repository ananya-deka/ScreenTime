import classes from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";

import homeLogo from "../../assets/home-filled-svgrepo-com.svg";
import movieLogo from "../../assets/movie-logo.svg";
import tvLogo from "../../assets/tv-logo.svg";
import bookmarkLogo from "../../assets/heart-logo.svg";
import searchLogo from "../../assets/search-svgrepo-com.svg";
import { useState } from "react";

const Navbar = ({ toggleSearch }) => {
	const location = useLocation();
	const currentPage = location.pathname.includes("movie")
		? "movies"
		: location.pathname.includes("tv")
		? "tv"
		: location.pathname.includes("playlist")
		? "playlists"
		: location.pathname.includes("search")
		? "search"
		: "home";

	const [hovered, setHovered] = useState("");
	const [selected, setSelected] = useState(currentPage);

	return (
		<div className={classes.navbar}>
			<ul className={classes.options}>
				<Link to={`/`}>
					<li
						className={`${`${classes.option} ${
							selected === "home" && hovered !== "home"
								? classes.selected
								: null
						}`}`}
						onClick={() => setSelected("home")}
						onMouseEnter={() => setHovered("home")}
						onMouseLeave={() => setHovered("")}
					>
						{hovered === "home" && <p>Home</p>}

						<img
							className={classes.icon}
							height="23"
							width="23"
							src={homeLogo}
							alt="Home"
						/>
					</li>
				</Link>
				<Link to={`browse/movies`}>
					<li
						className={`${classes.option} ${
							selected === "movies" && hovered !== "movies"
								? classes.selected
								: null
						}`}
						onMouseEnter={() => setHovered("movies")}
						onMouseLeave={() => setHovered("")}
						onClick={() => setSelected("movies")}
					>
						{hovered === "movies" && <p>Movies</p>}

						<img
							className={classes.icon}
							height="23"
							width="23"
							src={movieLogo}
							alt="Movies"
						/>
					</li>
				</Link>
				<Link to={`browse/tv`}>
					<li
						className={`${classes.option} ${
							selected === "tv" && hovered !== "tv"
								? classes.selected
								: null
						}`}
						onMouseEnter={() => setHovered("tv")}
						onMouseLeave={() => setHovered("")}
						onClick={() => setSelected("tv")}
					>
						{hovered === "tv" && <p>TV</p>}

						<img
							className={classes.icon}
							height="23"
							width="23"
							src={tvLogo}
							alt="TV Shows"
						/>
					</li>
				</Link>
				<Link to={`playlists`}>
					<li
						className={`${classes.option} ${
							selected === "playlists" && hovered !== "playlists"
								? classes.selected
								: null
						}`}
						onMouseEnter={() => setHovered("playlists")}
						onMouseLeave={() => setHovered("")}
						onClick={() => setSelected("playlists")}
					>
						{hovered === "playlists" && <p>Playlists</p>}

						<img
							className={classes.icon}
							height="23"
							width="23"
							src={bookmarkLogo}
							alt="Bookmarks"
						/>
					</li>
				</Link>

				<li
					className={`${classes.option} ${
						selected === "search" && hovered !== "search"
							? classes.selected
							: null
					}`}
					onMouseEnter={() => setHovered("search")}
					onMouseLeave={() => setHovered("")}
					onClick={() => {
						toggleSearch();

						setSelected("search");
					}}
				>
					{hovered === "search" && <p>Search</p>}

					<img
						className={classes.icon}
						height="23"
						width="23"
						src={searchLogo}
						alt="Search"
					/>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
