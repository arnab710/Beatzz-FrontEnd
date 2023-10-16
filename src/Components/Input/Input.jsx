/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import style from "./Input.module.css";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

const Input = ({ ID, children, type, placeholder, SpecificInput = "", input = "", state = "", PassCheck = "" }) => {
	const [showPass, setShowPass] = useState(false);

	const handleChange = (e) => {
		if (ID.current === "" || ID.current) ID.current = e.target.value;
		else ID(e.target.value);
	};

	return (
		<div className={SpecificInput ? SpecificInput : style.SpecificInput}>
			<span>{children}</span>
			{ID.current === "" || ID.current ? (
				<input type={type} placeholder={placeholder} className={input ? input : style.input} required onChange={handleChange} />
			) : (
				<input type={PassCheck && showPass ? "text" : type} placeholder={placeholder} className={input ? input : style.input} required value={state} onChange={handleChange} />
			)}
			{PassCheck && (
				<span onClick={() => setShowPass((prev) => !prev)} className={style.showpass}>
					{showPass ? <BiSolidHide /> : <BiSolidShow />}
				</span>
			)}
		</div>
	);
};

export default Input;
