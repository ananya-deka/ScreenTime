import { Outlet } from "react-router-dom";

import classes from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import SearchBar from "./components/UI/SearchBar";

function App() {
	return (
		<>
			<aside className={classes.navbar}>
				<Navbar></Navbar>
			</aside>
			<div className={classes.content}>
				<SearchBar placeholder="Search for movies or TV shows" />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
