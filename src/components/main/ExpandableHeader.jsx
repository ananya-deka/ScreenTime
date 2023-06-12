import classes from "./ExpandableHeader.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../UI/Header";

const ExpandableHeader = ({ title, mediaType }) => {
	const [expandVisible, setExpandVisible] = useState(false);

	return (
		<Header>
			<div
				onMouseEnter={() => setExpandVisible(true)}
				onMouseLeave={() => setExpandVisible(false)}
				className={classes.title}
			>
				<h3>{title}</h3>
				<div>
					{expandVisible && (
						<p className={classes.expanded}>
							<Link to={`/browse/genres/${mediaType}/toprated`}>
								See All...
							</Link>
						</p>
					)}
				</div>
			</div>
		</Header>
	);
};

export default ExpandableHeader;
