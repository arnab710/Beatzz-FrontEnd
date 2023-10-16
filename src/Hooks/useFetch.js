import { useQuery } from "@tanstack/react-query";

const fetchData = async (str) => {
	let queryStr = "";
	if (str) queryStr = `?${str}`;
	const APIport = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/products${queryStr}`;
	const response = await fetch(`${APIport}`);
	if (!response.ok) throw new Error("Server is Down");
	const data = await response.json();
	return data;
};
const useFetch = (str = "", staleTime = 0) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", str],
		queryFn: () => fetchData(str),
		staleTime,
	});

	return { data, isLoading, isError };
};

export default useFetch;
