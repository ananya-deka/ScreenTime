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
import GenreProvider from "./contexts/GenreContext";

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
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GenreProvider>
			<RouterProvider router={router} />
		</GenreProvider>
	</React.StrictMode>
);
