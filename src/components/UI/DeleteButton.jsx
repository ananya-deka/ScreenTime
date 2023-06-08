import classes from "./DeleteButton.module.css";

const DeleteButton = ({ removeItem, item }) => {
	function changeColor(e, color) {
		e.target.style.color = `${color}`;
	}

	return (
		<button
			className={classes.delete_button}
			onClick={(e) =>
				item ? removeItem(e, item.media_type, item.id) : removeItem()
			}
		>
			<i
				onMouseOver={(e) => changeColor(e, "red")}
				onMouseLeave={(e) => changeColor(e, "#ffffff")}
				className={"fa-solid fa-xmark fa-xl"}
				style={{
					color: "#ffffff",
					transition: "color 0.5s",
				}}
			></i>
		</button>
	);
};

export default DeleteButton;
