import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteUserInfo } from "../Redux/Slices/UserSlice";
import { clearCart } from "../Redux/Slices/CartSlice";

const LogOut = async () => {
	const APIPort = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/users/Log-out`;
	const response = await fetch(APIPort, {
		method: "POST",
		credentials: "include",
	});

	const data = await response.json();
	if (!response.ok) throw new Error(data.err);
};

export const useLogOut = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation({
		mutationFn: LogOut,
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
		onSuccess: () => {
			toast.success("Logged out Successful", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});
			dispatch(deleteUserInfo());
			dispatch(clearCart());
			try {
				localStorage.clear();
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
			queryClient.removeQueries();
		},
	});

	return { mutate, isLoading };
};
