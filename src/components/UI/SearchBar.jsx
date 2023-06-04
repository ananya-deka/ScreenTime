import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./SearchBar.module.css";
import { useEffect, useRef } from "react";

const SearchBar = ({ placeholder }) => {
	const inputRef = useRef();
	const [params] = useSearchParams();
	const query = params.get("q");
	const navigate = useNavigate();
	useEffect(() => {
		inputRef.current.value = query;
	}, [query]);

	function searchHandler(e) {
		const firstSearch = query === null;
		const newQuery = e.target.value;
		if (newQuery.trim() === "") {
			navigate(-1, {
				replace: true,
			});
		} else {
			navigate(`/search/?q=${newQuery}`, {
				replace: !firstSearch,
			});
		}
	}

	return (
		<form className={classes.search} autoComplete="off">
			<input
				onChange={searchHandler}
				type="search"
				placeholder={placeholder}
				className={classes["search-bar"]}
				name="q"
				ref={inputRef}
			/>
			;
		</form>
	);
};

export default SearchBar;
