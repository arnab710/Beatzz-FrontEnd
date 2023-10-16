/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

import style from "./Protected.module.css";

const Protected = ({ children }) => {
	const userData = useSelector((state) => state.user.name);
	const Navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!userData) Navigate("/login", { state: { from: location.pathname } });
	}, [userData, Navigate, location.pathname]);

	return (
		<>
			{userData ? (
				<>{children}</>
			) : (
				<div className={style.spinnerDiv}>
					<Loading />
				</div>
			)}
		</>
	);
};

export default Protected;
