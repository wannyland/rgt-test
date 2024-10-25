const mysql = require("mysql2/promise");
const env = require("dotenv");

env.config();

const pool = mysql.createPool({
  host: process.env.BOOK_DB_HOST,
  user: process.env.BOOK_DB_USER,
  password: process.env.BOOK_DB_PASSWORD,
  database: process.env.BOOK_DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

class DataBaseManager {
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

    if (poolConnection == null) return false;

    try {
      const r = await poolConnection.query(sql).catch(() => {
        return false;
      });
      poolConnection.release();

      return r ? r[0] : false;
    } catch (err) {
      console.log(err);
      poolConnection.release();

      return false;
    }
  };
}

export = new DataBaseManager();
