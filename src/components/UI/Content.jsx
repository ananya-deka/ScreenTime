import classes from "./Content.module.css";

import TopRatedList from "../main/TopRatedList";
import Details from "../main/Details";
import Section from "../main/Section";
import { useEffect } from "react";

const Content = ({ title, carousel, section, details }) => {
	return (
		<section className={classes.page}>
			{!details && (
				<header className={classes.header}>
					<h2>{title}</h2>
				</header>
			)}
			{carousel && <TopRatedList movies={carousel} />}
			{section && <Section movies={section} />}
			{details && <Details video={details} />}
		</section>
	);
};

export default Content;
