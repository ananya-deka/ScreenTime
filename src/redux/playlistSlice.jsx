import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
	name: "playlist",
	initialState: {
		playlists: {
			Watchlist: {
				name: "Watchlist",
				movies: {},
				tv: {},
			},
		},
		movies: {},
		tv: {},
	},
	reducers: {
		createPlaylist: (state, action) => {
			const payload = action.payload;
			const name = payload.name;
			const video = payload.video;
			const id = video.id;
			const media_type = payload.media_type;

			const movies = media_type === "movie" ? { [id]: video } : {};
			const tv = media_type === "tv" ? { [id]: video } : {};

			state.playlists[name] = {
				name,
				movies,
				tv,
			};

			const newlyAdded = {
				video,
				playlist: name,
			};

			if (media_type === "movie") {
				if (state.movies[id]) {
					state.movies[id].push(newlyAdded);
				} else state.movies[id] = [newlyAdded];
			} else {
				if (state.movies[id]) {
					state.tv[id].push(newlyAdded);
				} else state.tv[id] = [newlyAdded];
			}
		},

		addToPlaylist: (state, action) => {
			const payload = action.payload;
			const media_type = payload.media_type;
			const video = payload.video;
			const id = video.id;
			const playlist = payload.playlist;

			if (media_type === "movie") {
				state.playlists[playlist].movies[id] = video;
			} else {
				state.playlists[playlist].tv[id] = video;
			}

			const newlyAdded = {
				video,
				playlist,
			};

			if (media_type === "movie") {
				if (state.movies[id]) {
					state.movies[id].push(newlyAdded);
				} else state.movies[id] = [newlyAdded];
			} else {
				if (state.movies[id]) {
					state.tv[id].push(newlyAdded);
				} else state.tv[id] = [newlyAdded];
			}
		},
	},
});

export const { createPlaylist, addToPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
