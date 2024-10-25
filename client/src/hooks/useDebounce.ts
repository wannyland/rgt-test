import { useRef } from "react";

/**
 *
 * callback: 디바운스 적용할 함수
 * timer : 타이머 (ms)
 * @description timer 지난 후 callback 실행
 *
 */
function useDebounce<T extends any[]>(
  callback: (...params: T) => void,
  time: number
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...params: T) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, time);
  };
}

export default useDebounce;
