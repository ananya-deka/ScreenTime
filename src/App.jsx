import { Outlet } from "react-router-dom";

import classes from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import SearchBar from "./components/UI/SearchBar";
import { ScrollRestoration } from "react-router-dom";
import { fetchPlaylists } from "./redux/playlistSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const fetchStatus = useSelector((state) => state.playlist.fetchStatus);
	const [searchVisible, setSearchVisible] = useState(false);

	useEffect(() => {
		if (fetchStatus === "idle") {
			dispatch(fetchPlaylists());
		}
	}, [dispatch, fetchStatus]);

	const hideSearch = (e) => {
		if (e.code === "Escape") setSearchVisible(false);
	};

	useEffect(() => {
		window.addEventListener("keyup", hideSearch);

		return () => removeEventListener("keyup", hideSearch);
	}, []);

	function toggleSearch() {
		setSearchVisible((prev) => !prev);
	}

	return (
		<>
			<aside className={classes.navbar}>
				<Navbar toggleSearch={toggleSearch}></Navbar>
			</aside>
			<div className={classes.content}>
				{searchVisible && (
					<SearchBar placeholder="Search for movies or TV shows" />
				)}
				<ScrollRestoration />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
