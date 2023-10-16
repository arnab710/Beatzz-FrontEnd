import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const PostReview = async (id, { rating, review }) => {
	const APIPort = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/reviews/${id}`;

	const body = JSON.stringify({ rating, review });

	const response = await fetch(APIPort, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
		credentials: "include",
	});
	const data = await response.json();
	if (!response.ok) throw new Error(`${data.err || "Some Error Occurred , Please Try Again"}`);
	return data;
};

const usePostReview = (id) => {
	const queryClient = useQueryClient();

	const { mutate, isLoading, data } = useMutation({
		mutationFn: ({ rating, review }) => PostReview(id, { rating, review }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [id, "reviews"] });
			queryClient.invalidateQueries({ queryKey: [id] });
			toast.success("Review created Successfully", {
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

export default usePostReview;
