const mysql = require("mysql2/promise");
const env = require("dotenv");

env.config();

const pool = mysql.createPool({
  host: process.env.BOOK_DB_HOST,
  user: process.env.BOOK_DB_USER,
  password: process.env.BOOK_DB_PASSWORD,
  database: process.env.BOOK_DB_NAME,
  port: 3306,
  waitForConnections: true, // connectionLimit 이 차면 대기 여부
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

class DataBaseManager {
  // 연결 풀에서 사용 가능한 연결을 획득
  getConnection = async () => {
    let poolConnection: any = null;

    try {
      poolConnection = await pool.getConnection();
    } catch (err) {
      console.log(err);
    }

    return poolConnection;
  };

  query = async (sql: string) => {
    let poolConnection: any = null;

    try {
      poolConnection = await pool.getConnection();
    } catch (err) {
      console.log(err);
    }

    // 풀 연결 실패시 false 반환
    if (poolConnection == null) return false;

    try {
      const r = await poolConnection.query(sql).catch(() => {
        return false;
      });
      poolConnection.release();

      // 쿼리가 성공하면 결과의 첫 번째 배열(r[0]) 반환
      return r ? r[0] : false;
    } catch (err) {
      console.log(err);
      poolConnection.release();

      return false;
    }
  };
}

export = new DataBaseManager();
