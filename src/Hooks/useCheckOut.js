import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

const checkOut = async (items) => {
	const APIPort = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/checkout`;

	const response = await fetch(APIPort, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(items.cartValues),
		credentials: "include",
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message);

	return data;
};

export const useCheckOut = () => {
	const { mutate, isLoading } = useMutation({
		mutationFn: checkOut,
		onSuccess: (data) => {
			toast.success("Redirecting to Payment Page", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});
			window.location.href = data.url;
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

	return { mutate, isLoading };
};
