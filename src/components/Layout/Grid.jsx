import classes from "./Grid.module.css";

const Grid = (props) => {
	return (
		<div className={props.grid ? classes.grid : classes.flex}>
			{props.children}
		</div>
	);
};

export default Grid;
