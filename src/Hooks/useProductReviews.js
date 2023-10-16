import { useQuery } from "@tanstack/react-query";

const fetchData = async (id) => {
	const APIport = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/reviews/${id}?sort=-createdAt&limit=3`;
	const response = await fetch(APIport);
	if (!response.ok) throw new Error("Server Down");
	const data = await response.json();
	return data;
};

const useProductReviews = (id) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: [id, "reviews"],
		queryFn: () => fetchData(id),
		staleTime: 24 * 60 * 60 * 1000,
	});
	return { data, isLoading, isError };
};

export default useProductReviews;
