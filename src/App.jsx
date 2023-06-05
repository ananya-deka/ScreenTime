import { Outlet } from "react-router-dom";

import classes from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import SearchBar from "./components/UI/SearchBar";
import { ScrollRestoration } from "react-router-dom";
import { fetchPlaylists } from "./redux/playlistSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const fetchStatus = useSelector((state) => state.playlist.fetchStatus);

	useEffect(() => {
		if (fetchStatus === "idle") {
			dispatch(fetchPlaylists());
		}
	}, [dispatch, fetchStatus]);

	return (
		<>
			<aside className={classes.navbar}>
				<Navbar></Navbar>
			</aside>
			<div className={classes.content}>
				<SearchBar placeholder="Search for movies or TV shows" />
				<ScrollRestoration />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
