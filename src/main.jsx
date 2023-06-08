import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import SearchPage, { loader as searchLoader } from "./pages/SearchPage";
import DetailsPage, { loader as detailsLoader } from "./pages/DetailsPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import PlaylistPage from "./pages/PlaylistPage";
import GenresPage from "./pages/GenresPage";
import GenreProvider from "./context/genre-context";
import BrowsePage from "./pages/BrowsePage";
import ListingPage, { loader as listingLoader } from "./pages/ListingPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "browse",
				element: <BrowsePage />,
				children: [
					{
						path: ":mediaType",
						element: <ListingPage />,
						loader: listingLoader,
					},
					{
						path: "genres/:page/:genreId",
						element: <GenresPage />,
					},
				],
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
			<GenreProvider>
				<RouterProvider router={router} />
			</GenreProvider>
		</Provider>
	</React.StrictMode>
);
