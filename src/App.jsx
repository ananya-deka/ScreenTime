import { Outlet } from "react-router-dom";
import requests from "./api/requests";
import axios from "./api/axios";
import classes from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import SearchBar from "./components/UI/SearchBar";
import { ScrollRestoration } from "react-router-dom";
import { fetchPlaylists, transformPlaylists } from "./redux/playlistSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGenre } from "./context/genre-context";

function App() {
	const dispatch = useDispatch();
	const fetchStatus = useSelector((state) => state.playlist.fetchStatus);
	const [searchVisible, setSearchVisible] = useState(false);
	const { setMovieGenres, setTvGenres } = useGenre();
	const playlists = useSelector((state) => state.playlist.playlists);

	useEffect(() => {
		async function loadMovieGenres() {
			const response = await axios.get(requests.getMovieGenres);
			setMovieGenres(response.data.genres);

			return response;
		}

		async function loadTvGenres() {
			const response = await axios.get(requests.getTvGenres);
			setTvGenres(response.data.genres);

			return response;
		}

		loadMovieGenres();
		loadTvGenres();
	}, [setMovieGenres, setTvGenres]);

	useEffect(() => {
		window.addEventListener("keyup", hideSearch);

		return () => removeEventListener("keyup", hideSearch);
	}, []);

	useEffect(() => {
		if (fetchStatus === "idle") {
			dispatch(fetchPlaylists());
		}
	}, [dispatch, fetchStatus]);

	useEffect(() => {
		if (fetchStatus === "succeeded") {
			dispatch(transformPlaylists());
		}
	}, [dispatch, fetchStatus, playlists]);

	const hideSearch = (e) => {
		if (e.code === "Escape") setSearchVisible(false);
	};

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
