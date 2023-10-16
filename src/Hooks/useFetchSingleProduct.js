import { useQuery } from "@tanstack/react-query";

const fetchSingleData = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/products/${id}`);
	if (!response.ok) return new Error("Server is Down");
	const data = await response.json();

	return data;
};

const useFetchSingleProduct = (id) => {
	const { data, isLoading, isError } = useQuery({
		queryFn: () => fetchSingleData(id),
		queryKey: [id],
		staleTime: 24 * 60 * 60 * 1000,
	});

	return { data, isLoading, isError };
};

export default useFetchSingleProduct;
