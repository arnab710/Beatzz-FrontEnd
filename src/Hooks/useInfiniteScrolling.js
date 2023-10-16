import { useInfiniteQuery } from "@tanstack/react-query";

const fetchData = async (pageParam, limit, SortQuery, NameQuery) => {
	const APIport = `${import.meta.env.VITE_APP_PORT}${import.meta.env.VITE_APP_API}/products?${NameQuery ? `name=${NameQuery}` : ``}&sort=${SortQuery}&limit=${limit}&page=${pageParam}`;
	const response = await fetch(`${APIport}`);
	if (!response.ok) throw new Error("Server is down");
	const data = await response.json();
	return data;
};

const useInfiniteScrolling = (dependency, limit = 4, SortQuery = "price", NameQuery = "") => {
	const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
		queryKey: [dependency, limit, SortQuery, NameQuery],
		queryFn: ({ pageParam = 1 }) => fetchData(pageParam, limit, SortQuery, NameQuery),
		staleTime: 24 * 60 * 60 * 1000,
		getNextPageParam: (_lastPage, pages) => pages.length + 1,
	});

	return { data, isLoading, isError, isFetchingNextPage, fetchNextPage };
};

export default useInfiniteScrolling;
