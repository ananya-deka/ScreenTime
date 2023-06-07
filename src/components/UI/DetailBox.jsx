import classes from "./DetailsBox.module.css";

const DetailsBox = (props) => {
	return <section className={classes.details_box}>{props.children}</section>;
};

export default DetailsBox;
