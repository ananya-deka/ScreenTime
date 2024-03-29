import requests from "../api/requests";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import List from "../components/main/List";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "../components/UI/Select";

countries.registerLocale(enLocale);
const countryObj = countries.getNames("en", { select: "official" });
const options = Object.entries(countryObj).map((country) => ({
	label: country[1],
	value: country[1],
	region_key: country[0],
}));
const defaultCountry = options.find((country) => country.region_key === "IN");

const HomePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
	const [selected, setSelected] = useState(defaultCountry);

	useEffect(() => {
		setCurrentPage(1);
		setHasMore(true);
	}, [selected]);

	useEffect(() => {
		async function loadCurrentlyPlaying() {
			const response = await axios.get(
				`${requests.getCurrentlyPlaying}${selected.region_key}&page=${currentPage}`
			);

			const data = response.data;

			setCurrentlyPlaying((current) =>
				currentPage === 1 ? data.results : [...current, ...data.results]
			);

			setHasMore(currentPage !== data.total_pages);

			return response;
		}

		loadCurrentlyPlaying();
	}, [selected, currentPage]);

	function switchRegion(selectedOption) {
		setSelected(selectedOption);
	}

	function fetchData() {
		setCurrentPage((current) => ++current);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<Select
				onChange={switchRegion}
				options={options}
				defaultValue={defaultCountry}
			/>
			<InfiniteScroll
				dataLength={currentlyPlaying.length}
				next={fetchData}
				hasMore={hasMore}
			>
				<List
					title={`Currently In Theatres`}
					items={currentlyPlaying}
				/>
			</InfiniteScroll>
		</div>
	);
};

export default HomePage;
