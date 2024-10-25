// 쿼리 스트링 생성 함수
// 사용법
// const request = createUrlParam(data)

//   "api/${request}"
export const createUrlParam = (data: any) => {
  let form = ["?"];
  for (let i in data) {
    if (data[i] !== undefined && data[i] !== null && data[i] !== "")
      form.push(`${i}=${data[i]}&`);
  }
  const result = form
    .toString()
    .replace(",", "")
    .replaceAll(",", "")
    .replaceAll("$", ",")
    .slice(0, -1);

  return result;
};

// 숫자에 천자리마다 , 삽입
export const addNumberComma = (n?: number): string => {
  if (!n) return "0";

  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
