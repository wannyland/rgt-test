import { useQuery, UseQueryOptions } from "react-query";

function useGetQuery<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (_: any) => Promise<any>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
  enable?: boolean
) {
  const { refetch, isLoading, data, error, isError, isSuccess } = useQuery(
    queryKey,
    fetcher,
    {
      ...options,
      refetchInterval: options?.refetchInterval,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: options?.enabled,
      retry: 0,
    }
  );

  return { isLoading, data, error, refetch, isError, isSuccess };
}

export default useGetQuery;
