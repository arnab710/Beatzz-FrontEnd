import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import Nav from "../NavBar/Nav";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUserInfo } from "../../Redux/Slices/UserSlice";
import useCurrentUserDetails from "../../Hooks/useCurrentUserDetails";
import Loading from "../../Components/Loading/Loading";

const Layout = () => {
	const userDataFromRedux = useSelector((state) => state.user);

	const location = useLocation();
	const dispatch = useDispatch();
	const { data, isLoading } = useCurrentUserDetails();

	useEffect(() => {
		let userInfoFromStorage = null;

		if (!userDataFromRedux.name) {
			try {
				userInfoFromStorage = localStorage.getItem("BeatzzUser");
			} catch (err) {
				if (import.meta.env.VITE_APP_ENV !== "production") {
					console.error("Unable to Access LocalStorage");
				}
			}
		}
		if (userInfoFromStorage && !userDataFromRedux.name) {
			const userData = JSON.parse(userInfoFromStorage);
			dispatch(updateUserInfo({ _id: userData._id, name: userData.name, email: userData.email }));
		} else if (!userDataFromRedux.name && !userInfoFromStorage && data?.result === "pass" && !isLoading) {
			dispatch(updateUserInfo(data.MyDetails));
			try {
				localStorage.setItem("BeatzzUser", JSON.stringify(data.MyDetails));
			} catch (err) {
				if (import.meta.env.VITE_APP_ENV !== "production") {
					console.error("Unable to Access LocalStorage");
				}
			}
		}
	}, [dispatch, userDataFromRedux, data, isLoading]);

	return (
		<>
			{isLoading ? (
				<div className={style.spinnerDiv}>
					<Loading />
				</div>
			) : (
				<>
					<Nav key={location.pathname} />
					<Outlet />
					{location.pathname !== "/products" && <Footer />}
				</>
			)}
		</>
	);
};
export default Layout;
