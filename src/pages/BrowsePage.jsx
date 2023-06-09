import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGenre } from "../context/genre-context";
import Select from "../components/UI/Select";

const BrowsePage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState(null);
	const { movieGenres } = useGenre();
	const { tvGenres } = useGenre();
	const genres = params.mediaType === "movies" ? movieGenres : tvGenres;

	useEffect(() => {
		const genreOptions = genres.map((genre) => ({
			value: genre.name,
			label: genre.name,
			id: genre.id,
		}));
		setOptions(genreOptions);
	}, [genres]);

	useEffect(() => {
		if (params.mediaType) {
			setSelected(null);
		}
	}, [params.mediaType]);

	useEffect(() => {
		if (selected) {
			navigate(
				`/browse/genres/${
					params.mediaType === "movies" ? "movie" : "tv"
				}/${selected.id}`
			);
		}
	}, [selected]);

	function switchGenres(selectedOption) {
		setSelected(selectedOption);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<Select
				placeholder={"Browse by Genre..."}
				onChange={switchGenres}
				options={options}
				value={selected}
			/>

			<Outlet setSelected={setSelected} />
		</div>
	);
};

export default BrowsePage;
