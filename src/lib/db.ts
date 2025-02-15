import mysql from "mysql";
import util from "util";

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "nextjs",
});

export const query = util.promisify(db.query).bind(db);

export default db;