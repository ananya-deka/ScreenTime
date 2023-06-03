import { Form, useSearchParams, useSubmit } from "react-router-dom";
import classes from "./SearchBar.module.css";
import { useEffect, useRef } from "react";

const SearchBar = ({ placeholder }) => {
	const submit = useSubmit();
	const inputRef = useRef();
	const [params] = useSearchParams();
	const query = params.get("q");

	useEffect(() => {
		inputRef.current.value = query;
	}, [query]);

	function searchHandler(e) {
		const firstSearch = query === null;
		submit(e.currentTarget.form, { replace: !firstSearch });
	}

	return (
		<Form action="search" className={classes.search} autoComplete="off">
			<input
				onChange={searchHandler}
				type="search"
				placeholder={placeholder}
				className={classes["search-bar"]}
				name="q"
				ref={inputRef}
			/>
			;
		</Form>
	);
};

export default SearchBar;
