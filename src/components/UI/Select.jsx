import Select from "react-select";
import classes from "./Select.module.css";

const customStyles = {
	option: (defaultStyles, state) => ({
		...defaultStyles,
		color: state.isSelected ? "#212529" : "#fff",
		backgroundColor:
			state.isSelected || state.isFocused ? "#a0a0a0" : "#212529",
	}),

	control: (defaultStyles) => ({
		...defaultStyles,
		backgroundColor: "#212529",
		padding: "10px",
		boxShadow: "0 2px 8px #000",
		border: "none",
	}),
	singleValue: (defaultStyles) => ({
		...defaultStyles,
		color: "#fff",
	}),
};

const CustomSelect = ({
	onChange,
	options,
	placeholder,
	defaultValue,
	value,
}) => {
	return (
		<div className={classes.select_wrapper}>
			<Select
				placeholder={placeholder}
				onChange={onChange}
				options={options}
				styles={customStyles}
				value={value}
				defaultValue={defaultValue}
			/>
		</div>
	);
};

export default CustomSelect;
