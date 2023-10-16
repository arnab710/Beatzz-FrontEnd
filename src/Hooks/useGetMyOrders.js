import { useQuery } from "@tanstack/react-query";

const getMyOrders = async () => {
	const APIPort = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/orders/My-Orders`;
	const response = await fetch(APIPort, {
		credentials: "include",
	});
	if (!response.ok) throw new Error("Something went wrong");
	const data = await response.json();
	return data;
};

export const useGetMyOrders = () => {
	const { data, isLoading } = useQuery({
		queryFn: getMyOrders,
		queryKey: ["my-orders"],
	});
	return { data, isLoading };
};
