import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "../Redux/Slices/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LocalStorageSetter = (data) => {
	const userInfo = data.NewUser;
	const StringUserValue = JSON.stringify(userInfo);
	try {
		localStorage.setItem("BeatzzUser", StringUserValue);
	} catch (err) {
		if (import.meta.env.VITE_APP_ENV !== "production") {
			console.error("Unable to Access LocalStorage");
		}
	}
};

const createUser = async ({ name, email, password, confirmpassword }) => {
	const APIPort = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/users/Sign-up`;
	const response = await fetch(APIPort, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password, confirmpassword }),
		credentials: "include",
	});
	const data = await response.json();
	if (!response.ok) throw new Error(`${data.message ? data.message : "Something went wrong!!"}`);
	return data;
};

const useCreateNewUser = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();

	const { mutate, isLoading, data } = useMutation({
		mutationFn: createUser,
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
		onSuccess: (data) => {
			dispatch(updateUserInfo({ email: data.NewUser.email, name: data.NewUser.name, _id: data.NewUser._id }));
			LocalStorageSetter(data);
			toast.success("Signed up Successfully", {
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
				MyDetails: data.NewUser,
			});
			if (location.state && location.state.from) Navigate(location.state.from, { replace: true });
			else Navigate("/", { replace: true });
		},
	});
	return { mutate, isLoading, data };
};

export default useCreateNewUser;
