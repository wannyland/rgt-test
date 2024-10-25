import { useQuery, UseQueryOptions } from "react-query";

function useGetQuery<
  TQueryKey extends [string, Record<string, unknown>?], // 쿼리 키 타입
  TQueryFnData, // 원본 데이터 타입
  TError, // 요청 실패 시 발생하는 에러 타입
  TData = TQueryFnData // 데이터 변환될 타입 (기본 : 원본 데이터)
>(
  queryKey: TQueryKey, // 캐시하고 구분될 키
  fetcher: (_: any) => Promise<any>, // API (기본 : axios)
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >, // react-query 옵션 , "queryKey" | "queryFn" 는 이미 전달되어서 제외
  enable?: boolean // 조건부 요청
) {
  const { refetch, isLoading, data, error, isError, isSuccess } = useQuery(
    queryKey,
    fetcher,
    {
      ...options,
      refetchInterval: options?.refetchInterval, // 데이터 갱신
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: options?.enabled, // 백그라운드 리패치 (기본 : enable)
      retry: 0,
    }
  );

  return { isLoading, data, error, refetch, isError, isSuccess };
}

export default useGetQuery;
