import classes from "./Header.module.css";

const Header = (props) => {
	return <header className={classes.header}>{props.children}</header>;
};

export default Header;
