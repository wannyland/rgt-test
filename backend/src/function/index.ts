// page와 per 로 limit sql 만들어주는 함수
export const attachOffsetLimit = (page: number, per: number) => {
  if (!page || !per) return "";
  else {
    const offset = Number(page - 1) * Number(per);
    return ` LIMIT ${offset}, ${Number(per)}`;
  }
};

// select 쿼리 로그 확인 함수
export const getData = async (
  db: any,
  sql: string,
  path: string
): Promise<Array<any>> => {
  try {
    const res = await db.query(sql).catch(() => {
      return [];
    });

    // 콘솔 출력 확인시 주석해제
    //console.log(sql);

    return res && res.length > 0 ? (Array.isArray(res[0]) ? res[0] : res) : [];
  } catch (err) {
    console.log(`Error[sql/${path}] : ${err}`);
  }

  return null;
};

// 쿼리 파라미터 할당
export const filledParam = (param: object) => {
  let tempArr = ["id", "page", "per"];
  let tempObj = {};

  if (!param) {
    return {};
  }

  for (const key in param) {
    if (!param[key]) {
      continue;
    }

    // tempArr 에 포함되면 타입 number 고정
    if (tempArr.includes(key)) {
      tempObj[key] = Number(param[key]);
    } else {
      tempObj[key] = param[key];
    }
  }
  return tempObj;
};

// response handler
export const ResponseHandler = (result: number) => {
  if (result > 0) {
    return { code: 200, data: null, message: "완료되었습니다." };
  }

  if (result === -1) {
    return {
      code: 500,
      data: null,
      message: "알 수 없는 오류가 발생 했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  if (result === -2) {
    return {
      code: 409,
      data: null,
      message: "중복된 값입니다. 다시 확인해 주세요.",
    };
  }
};
