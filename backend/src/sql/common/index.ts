import db from "database";
import { getData } from "function";
import { ServerError } from "router/model/error";

// 책 이름 중복 체크
export const checkBook = async (bookName: string) => {
  let result = 0;
  let conn = null;

  try {
    conn = await db.getConnection();

    if (!conn) throw "db connection error";

    const checkBook = /*SQL*/ `SELECT COUNT(id) AS cnt 
                                     FROM BOOKS 
                              WHERE name = '${bookName}' AND is_deleted = 'N'
                             `;
    const [res] = await getData(db, checkBook, "books/checkBook");

    result = res.cnt;
  } catch (err) {
    throw new ServerError(`Error[sql/books/checkBook] : ${err}`);
  } finally {
    if (conn) await conn.release();
  }
  return result;
};
