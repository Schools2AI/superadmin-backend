import dotEnv from "dotenv";
import mysql from "mysql2/promise";
dotEnv.config({ path: process.cwd() + "/config.env" });
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// Test connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();
    }
    catch (err) {
        console.error("Database connection failed:", err.message);
    }
})();
export default pool;
//# sourceMappingURL=db.js.map