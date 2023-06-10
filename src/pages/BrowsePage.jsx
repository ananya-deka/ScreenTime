import classes from "./Browse.module.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGenre } from "../context/genre-context";
import Select from "../components/UI/Select";
import Header from "../components/UI/Header";

const BrowsePage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState(null);
	const [genres, setGenres] = useState([]);
	const { movieGenres } = useGenre();
	const { tvGenres } = useGenre();
	const [title, setTitle] = useState("");

	useEffect(() => {
		if (params.page) {
			console.log("page");
			setGenres(params.page === "movie" ? movieGenres : tvGenres);
		}
	}, [params.page, movieGenres, tvGenres]);

	useEffect(() => {
		if (params.mediaType) {
			setSelected(null);
			setGenres(params.mediaType === "movies" ? movieGenres : tvGenres);
		}
	}, [params.mediaType, movieGenres, tvGenres]);

	useEffect(() => {
		console.log("genre");
		const genreOptions = genres.map((genre) => ({
			value: genre.name,
			label: genre.name,
			id: genre.id,
		}));
		setOptions(genreOptions);
	}, [genres]);

	useEffect(() => {
		if (params.mediaType && options.length > 0) {
			setTitle(params.mediaType === "movies" ? "Movies" : "TV Shows");
		}

		if (params.genreId && options.length > 0) {
			if (params.genreId === "popular") {
				setTitle("Popular Right Now");
			} else if (params.genreId === "toprated") {
				setTitle("Top Rated");
			} else {
				console.log(params.genreId, options);
				setTitle(
					options.find((option) => option.id === +params.genreId)
						.value
				);
			}
		}
	}, [params.genreId, options, params.mediaType]);

	useEffect(() => {
		if (selected) {
			navigate(
				`/browse/genres/${
					params.mediaType
						? params.mediaType === "movies"
							? "movie"
							: "tv"
						: params.page
				}/${selected.id}`
			);
		}
	}, [selected]);

	function switchGenres(selectedOption) {
		setSelected(selectedOption);
	}

	return (
		<div className={classes.page}>
			<div className={classes.header}>
				<Header>
					<h2 style={{ color: "gold" }}>{title}</h2>
				</Header>
				<Select
					placeholder={"Browse by Genre..."}
					onChange={switchGenres}
					options={options}
					value={selected}
				/>
			</div>

			<Outlet setSelected={setSelected} />
		</div>
	);
};

export default BrowsePage;
