import { useSearchParams } from "react-router-dom";
import style from "./FilterProducts.module.css";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const FilterProducts = () => {
	const [selectedValue, setSelectedValue] = useSearchParams();
	const [findName, setFindName] = useState(selectedValue.get("name") || "");
	const currentSelect = selectedValue.get("Sort-by") || "Price-asc";

	const handleChange = (e) => {
		const newValue = new URLSearchParams(selectedValue.toString());
		newValue.set("Sort-by", e.target.value);
		setSelectedValue(newValue);
	};
	const handleNameChange = (e) => {
		setFindName(e.target.value);
		if (e.target.value.length >= 3 || e.target.value.length === 0) {
			const newValue = new URLSearchParams(selectedValue.toString());
			newValue.set("name", e.target.value);
			setSelectedValue(newValue);
		}
	};

	return (
		<div className={style.filters}>
			<div className={style.inputDiv}>
				<BiSearch className={style.icon} />
				<input className={style.input} type="text" value={findName} placeholder="Type min. 3 letters" onChange={handleNameChange} />
			</div>
			<select className={style.options} value={currentSelect} onChange={handleChange}>
				<option value="Price-asc">Sort by Price (Low - High)</option>
				<option value="Price-dec">Sort by Price (High - Low)</option>
				<option value="Name-asc">Sort by Name (A - Z)</option>
				<option value="Name-dec">Sort by Name (Z - A)</option>
				<option value="Rating-asc">Sort by Rating (Low - High)</option>
				<option value="Rating-dec">Sort by Rating (High - Low)</option>
			</select>
		</div>
	);
};

export default FilterProducts;
