import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const updateCart = async (cartData) => {
	const APIPort = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/cart`;
	const response = await fetch(APIPort, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ products: cartData.cartValues }),
		credentials: "include",
	});
	const data = await response.json();
	if (!response.ok) throw new Error(`${data.err ? data.err : "Something went wrong"}`);

	return data;
};

export const useCartUpdate = () => {
	const { mutate, isLoading, data } = useMutation({
		mutationFn: updateCart,
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
