import classes from "./Content.module.css";

import Carousel from "../main/Carousel";
import Details from "../main/Details";
import Section from "../main/Section";

const Content = ({ title, carousel, section, details }) => {
	return (
		<section className={classes.page}>
			{!details && (
				<header className={classes.header}>
					<h2>{title}</h2>
				</header>
			)}
			{carousel && <Carousel movies={carousel} />}
			{section && <Section movies={section} />}
			{details && <Details video={details} />}
		</section>
	);
};

export default Content;
