import Select from "react-select";

const customStyles = {
	option: (defaultStyles, state) => ({
		...defaultStyles,
		color: state.isSelected ? "#212529" : "#fff",
		backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
	}),

	control: (defaultStyles) => ({
		...defaultStyles,
		backgroundColor: "#212529",
		padding: "10px",
		border: "none",
		boxShadow: "none",
	}),
	singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};

const CustomSelect = ({ onChange, options }) => {
	return (
		<Select onChange={onChange} options={options} styles={customStyles} />
	);
};

export default CustomSelect;
