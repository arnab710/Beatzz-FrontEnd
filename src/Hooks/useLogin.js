import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../Redux/Slices/UserSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const validateUser = async ({ email, password }) => {
	const APIport = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/users/Log-in`;

	const response = await fetch(APIport, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});
	if (!response.ok) {
		if (response.status === 403) throw new Error("You Are Already Logged in");
		else if (response.status === 401) throw new Error("Incorrect Email or Password");
		throw new Error("Login Error ! Please Try Again After Some Time");
	}
	const data = await response.json();

	return data;
};

const LocalStorageSetter = (data) => {
	const userInfo = data.user;
	const StringUserValue = JSON.stringify(userInfo);
	try {
		localStorage.setItem("BeatzzUser", StringUserValue);
	} catch (err) {
		toast.error("Unable to Access LocalStorage of Your Browser", {
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
				fontFamily: `"Inter",sans-serif`,
				letterSpacing: `0.03rem`,
				fontSize: `1.1rem`,
			},
		});
	}
};

const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();

	const { mutate, isLoading, data } = useMutation({
		mutationFn: validateUser,
		onSuccess: (data) => {
			dispatch(updateUserInfo({ email: data.user.email, name: data.user.name, _id: data.user._id }));
			LocalStorageSetter(data);
			toast.success("Logged in Successful", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});

			queryClient.setQueryData(["my-details"], {
				result: "pass",
				MyDetails: data.user,
			});
			if (location.state && location.state.from) navigate(location.state.from, { replace: true });
			else navigate("/", { replace: true });
		},
		onError: (err) => {
			toast.error(err.message, {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});
		},
	});

	return { mutate, isLoading, data };
};

export default useLogin;
