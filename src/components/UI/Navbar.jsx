import classes from "./Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import homeLogo from "../../assets/home-filled-svgrepo-com.svg";
import movieLogo from "../../assets/movie-logo.svg";
import tvLogo from "../../assets/tv-logo.svg";
import bookmarkLogo from "../../assets/heart-logo.svg";
import searchLogo from "../../assets/search-svgrepo-com.svg";
import { useState } from "react";

const Navbar = ({ toggleSearch }) => {
	const location = useLocation();
	const navigate = useNavigate();
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

	function navigationHandler(dest, destLink) {
		setSelected(dest);
		navigate(destLink);
	}

	return (
		<div className={classes.navbar}>
			<ul className={classes.options}>
				<li
					className={`${`${classes.option} ${
						selected === "home" && hovered !== "home"
							? classes.selected
							: hovered === "home"
							? classes.hovered__home
							: null
					}`}`}
					onClick={navigationHandler.bind(null, "home", "/")}
					onMouseEnter={() => setHovered("home")}
					onMouseLeave={() => setHovered("")}
				>
					<img
						className={classes.icon}
						height="23"
						width="23"
						src={homeLogo}
						alt="Home"
					/>
				</li>
				<li
					className={`${classes.option} ${
						selected === "movies" && hovered !== "movies"
							? classes.selected
							: hovered === "movies"
							? classes.hovered__movies
							: null
					}`}
					onMouseEnter={() => setHovered("movies")}
					onMouseLeave={() => setHovered("")}
					onClick={navigationHandler.bind(
						null,
						"movies",
						"/browse/movies"
					)}
				>
					<img
						className={classes.icon}
						height="23"
						width="23"
						src={movieLogo}
						alt="Movies"
					/>
				</li>
				<li
					className={`${classes.option} ${
						selected === "tv" && hovered !== "tv"
							? classes.selected
							: hovered === "tv"
							? classes.hovered__tv
							: null
					}`}
					onMouseEnter={() => setHovered("tv")}
					onMouseLeave={() => setHovered("")}
					onClick={navigationHandler.bind(null, "tv", "/browse/tv")}
				>
					<img
						className={classes.icon}
						height="23"
						width="23"
						src={tvLogo}
						alt="TV Shows"
					/>
				</li>
				<li
					className={`${classes.option} ${
						selected === "playlists" && hovered !== "playlists"
							? classes.selected
							: hovered === "playlists"
							? classes.hovered__playlists
							: null
					}`}
					onMouseEnter={() => setHovered("playlists")}
					onMouseLeave={() => setHovered("")}
					onClick={navigationHandler.bind(
						null,
						"playlists",
						"/playlists"
					)}
				>
					<img
						className={classes.icon}
						height="23"
						width="23"
						src={bookmarkLogo}
						alt="Bookmarks"
					/>
				</li>

				<li
					className={`${classes.option} ${
						selected === "search" && hovered !== "search"
							? classes.selected
							: hovered === "search"
							? classes.hovered__search
							: null
					}`}
					onMouseEnter={() => setHovered("search")}
					onMouseLeave={() => setHovered("")}
					onClick={() => {
						toggleSearch();
						setSelected("search");
					}}
				>
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
