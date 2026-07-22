import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.ts";

const host = process.env.SQL_HOST || "localhost";
const port = parseInt(process.env.PGPORT || "5432", 10);
const user = process.env.SQL_ADMIN_USER || process.env.SQL_USER || "postgres";
const password = process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD || "";
const database = process.env.SQL_DB_NAME || "postgres";

export const pool = new pg.Pool({
  host,
  port,
  user,
  password,
  database,
  ssl: false,
});

export const db = drizzle(pool, { schema });
