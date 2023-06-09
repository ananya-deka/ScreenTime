import classes from "./Loader.module.css";

const Loader = ({ loading }) => {
	return loading ? (
		<div className={classes.loader_overlay}>
			<div className={classes.loader}></div>
		</div>
	) : (
		<></>
	);
};

export default Loader;
