import { useQuery } from "@tanstack/react-query";

const fetchMyDetails = async () => {
	const APIport = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/users/my-details`;
	const response = await fetch(APIport, {
		credentials: "include",
	});

	if (!response.ok) throw new Error("Some Error Occurred , Please Login Again");

	const data = await response.json();

	return data;
};

const useCurrentUserDetails = () => {
	const { data, isLoading, isError } = useQuery({
		queryFn: fetchMyDetails,
		queryKey: ["my-details"],
		staleTime: 24 * 60 * 60 * 1000,
	});
	return { data, isLoading, isError };
};

export default useCurrentUserDetails;
