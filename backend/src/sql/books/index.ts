import db from "database";
import { attachOffsetLimit, getData } from "function";
import { CreateBookModel } from "router/model/books";
import { CommonParamModel } from "router/model/common";
import { ServerError } from "router/model/error";
import { checkBook } from "sql/common";

/**
 *
 * @date 2024.10.24
 * @author 태완
 * @description 상세, 리스트 API
 * 최근 등록 순
 *
 */
export const getBooks = async (filter: Partial<CommonParamModel>) => {
  let conn = null;
  let result = null;
  try {
    conn = await db.getConnection();

    if (!conn) throw "db connection error";

    //검색 내용 : 책 이름, 저자
    const commonSql = /*SQL*/ `WHERE book.is_deleted = 'N'
                                ${
                                  filter.id
                                    ? `AND book.id = ${filter.id}`
                                    : ` ${
                                        filter.word
                                          ? `AND book.name LIKE '%${filter.word}%' OR book.author LIKE '%${filter.word}%'`
                                          : ``
                                      } `
                                }`;

    // 총 개수를 가져오는 쿼리
    const totalSql = /*SQL*/ `SELECT
                                  COUNT(result.id) AS totalCount
                              FROM (
                                    SELECT
                                           book.id
                                    FROM BOOKS AS book
                                    ${commonSql}
                              GROUP BY book.id) AS result`;

    const getListQuery = /*SQL*/ `
                        SELECT
                             book.id, book.name, book.author, book.count, LEFT(book.registered_at, 10) AS registeredAt
                        FROM BOOKS AS book
                           ${commonSql}
                        ORDER BY book.registered_at DESC
                        ${attachOffsetLimit(filter.page, filter.per)}`;

    let getListRes = await getData(db, getListQuery, "books/getBooks");

    let [totalRes] = await getData(db, totalSql, "books/getBooksTotalCount");

    result = filter.id
      ? getListRes[0]
      : {
          totalCount: totalRes.totalCount,
          isLast:
            filter.page * (filter.per ? filter.per : 10) >= totalRes.totalCount,
          list: getListRes,
        };
  } catch (err) {
    await conn.rollback();
    throw new ServerError(`Error[sql/books/getBooks] : ${err}`);
  } finally {
    if (conn) await conn.release();
  }
  return result;
};

/**
 *
 * @date 2024.10.25
 * @author 태완
 * @description 책 등록 API
 * result = -1  :  기본 실패시
 * result = -2  :  책 이름 중복시
 * result > 0  : 성공 (insertId 는 무조건 0보다 큼)
 *
 */
export const insBook = async (data: CreateBookModel) => {
  let result = -1;
  const conn = await db.getConnection();

  if (!conn) throw "db connection error";

  try {
    await conn.beginTransaction();
    const bookNameChk = await checkBook(data.name);

    // 중복 값 있을시 -2 리턴
    if (bookNameChk > 0) {
      return -2;
    }

    const insBookQuery = /*SQL*/ `INSERT
                                        BOOKS
                                     SET
                                        name = '${data.name}',
                                        author = '${data.author}',
                                        count = ${data.count}
                                    `;

    const [insBookRes] = await conn.query(insBookQuery);

    if (insBookRes < 0) {
      result = -1;
      await conn.rollback();
      await conn.release();
      return;
    }

    result = insBookRes.insertId;

    if (result) await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw new ServerError(`Error[sql/book/insBook] : ${err}`);
  } finally {
    if (conn) await conn.release();
  }

  return result;
};
