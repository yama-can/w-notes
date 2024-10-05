import { createConnection } from "mysql2/promise";

export const sql = await createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	idleTimeout: 1000 * 60 * 60
});

setInterval(async () => {
	sql.query("SELECT 1")
}, 2000);
