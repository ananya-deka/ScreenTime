import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	playlists: {},
	sortedPlaylists: [],
	movies: {},
	tv: {},
	fetchStatus: "idle",
	updateStatus: "idle",
	deleteStatus: "idle",
	error: null,
};

export const fetchPlaylists = createAsyncThunk(
	"playlist/fetchPlaylists",
	async () => {
		const response = await fetch(
			"https://screentime-3123c-default-rtdb.firebaseio.com/playlists.json"
		);
		const data = await response.json();
		return data;
	}
);

export const createPlaylist = createAsyncThunk(
	"playlist/createPlaylist",
	async (payload) => {
		const name = payload.name;
		const video = payload.video;
		const media_type = payload.media_type;

		const movies =
			media_type === "movie"
				? {
						[video.id]: {
							video,
							creation_time: new Date().toString(),
						},
				  }
				: {};
		const tv =
			media_type === "tv"
				? {
						[video.id]: {
							video,
							creation_time: new Date().toString(),
						},
				  }
				: {};

		const newEntry = {
			name,
			movies,
			tv,
			creation_time: new Date().toString(),
		};

		const response = await fetch(
			"https://screentime-3123c-default-rtdb.firebaseio.com/playlists.json",
			{
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newEntry),
			}
		);

		const data = await response.json();
		return { key: data.name, newEntry };
	}
);

export const updatePlaylist = createAsyncThunk(
	"playlist/updatePlaylist",
	async (payload, { getState }) => {
		const media_type = payload.media_type;
		const video = payload.video;
		const key = payload.key;
		const state = getState().playlist;

		let updatedEntry = {
			...state.playlists[key],
		};

		const newEntry = {
			[video.id]: { video, creation_time: new Date().toString() },
		};
		if (media_type === "movie") {
			if (updatedEntry.movies) {
				updatedEntry.movies = { ...updatedEntry.movies, ...newEntry };
			} else {
				updatedEntry.movies = { ...newEntry };
			}
		} else {
			if (updatedEntry.tv) {
				updatedEntry.tv = { ...updatedEntry.tv, ...newEntry };
			} else {
				updatedEntry.tv = { ...newEntry };
			}
		}

		await fetch(
			`https://screentime-3123c-default-rtdb.firebaseio.com/playlists/${key}.json`,
			{
				method: "put",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedEntry),
			}
		);

		return { key, updatedEntry };
	}
);

export const deletePlaylist = createAsyncThunk(
	"playlist/deletePlaylist",
	async (payload) => {
		const key = payload.key;

		await fetch(
			`https://screentime-3123c-default-rtdb.firebaseio.com/playlists/${key}.json`,
			{
				method: "delete",
			}
		);

		return { key };
	}
);

export const removeFromPlaylist = createAsyncThunk(
	"playlist/removeFromPlaylist",
	async (payload) => {
		const playlistKey = payload.playlistKey;
		const media_type = payload.media_type;
		const videoKey = payload.videoKey;

		await fetch(
			`https://screentime-3123c-default-rtdb.firebaseio.com/playlists/${playlistKey}/${media_type}/${videoKey}.json`,
			{
				method: "delete",
			}
		);

		return { playlistKey, media_type, videoKey };
	}
);

export const playlistSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		transformPlaylists(state) {
			state.sortedPlaylists = Object.keys(state.playlists).map((key) => {
				const playlist = state.playlists[key];
				const movies = playlist.movies
					? Object.entries(playlist.movies)
					: [];
				const tv = playlist.tv ? Object.entries(playlist.tv) : [];
				const items = [...movies, ...tv];
				const sortedItems = [...items];
				sortedItems.sort(
					(a, b) =>
						new Date(b[1].creation_time) -
						new Date(a[1].creation_time)
				);

				const transformedItems = sortedItems.map(
					(item) => item[1].video
				);

				return {
					key,
					sortedItems: transformedItems,
					name: playlist.name,
				};
			});
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPlaylists.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchPlaylists.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";

				const playlists = action.payload;
				state.playlists = { ...playlists };
			})
			.addCase(fetchPlaylists.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.error.message;
			});

		builder
			.addCase(createPlaylist.pending, (state) => {
				state.updateStatus = "loading";
			})
			.addCase(createPlaylist.fulfilled, (state, action) => {
				state.updateStatus = "idle";

				const key = action.payload.key;
				const newEntry = action.payload.newEntry;
				state.playlists[key] = { ...newEntry };
			})
			.addCase(createPlaylist.rejected, (state, action) => {
				state.updateStatus = "failed";
				state.error = action.error.message;
			});

		builder
			.addCase(updatePlaylist.pending, (state) => {
				state.updateStatus = "loading";
			})
			.addCase(updatePlaylist.fulfilled, (state, action) => {
				state.updateStatus = "idle";

				const key = action.payload.key;
				const newEntry = action.payload.updatedEntry;
				state.playlists[key] = newEntry;
			})
			.addCase(updatePlaylist.rejected, (state, action) => {
				state.updateStatus = "failed";
				state.error = action.error.message;
			});

		builder
			.addCase(deletePlaylist.pending, (state) => {
				state.deleteStatus = "loading";
			})
			.addCase(deletePlaylist.fulfilled, (state, action) => {
				state.deleteStatus = "idle";

				const key = action.payload.key;
				delete state.playlists[key];
			})
			.addCase(deletePlaylist.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.error = action.error.message;
			});

		builder
			.addCase(removeFromPlaylist.pending, (state) => {
				state.deleteStatus = "loading";
			})
			.addCase(removeFromPlaylist.fulfilled, (state, action) => {
				state.deleteStatus = "idle";

				const playlistKey = action.payload.playlistKey;
				const media_type = action.payload.media_type;
				const videoKey = action.payload.videoKey;

				delete state.playlists[playlistKey][media_type][videoKey];
			})
			.addCase(removeFromPlaylist.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.error = action.error.message;
			});
	},
});

export const { transformPlaylists } = playlistSlice.actions;

export default playlistSlice.reducer;
