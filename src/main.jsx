import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import MoviesPage, { loader as moviesLoader } from "./pages/MoviesPage.jsx";
import TVPage, { loader as tvLoader } from "./pages/TVPage";
import HomePage from "./pages/HomePage";
import SearchPage, { loader as searchLoader } from "./pages/SearchPage";
import DetailsPage, { loader as detailsLoader } from "./pages/DetailsPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import PlaylistPage from "./pages/PlaylistPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: searchLoader,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "movies",
				element: <MoviesPage />,
				loader: moviesLoader,
			},
			{
				path: "tv",
				element: <TVPage />,
				loader: tvLoader,
			},
			{
				path: "search",
				element: <SearchPage />,
				loader: searchLoader,
			},
			{
				path: "details/:page/:id",
				element: <DetailsPage />,
				loader: detailsLoader,
			},
			{
				path: "playlists",
				element: <PlaylistPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
