import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
    connectionString: process.env.POSTGRES_DATABASE_URL,
    max: 10,
    min: 1,
    idleTimeoutMillis: 30000,
    verify: (client, done) => {
        client.query('SELECT 1', (err) => {
            done(err);
        });
    }
});

export const db = drizzle(pool, { schema });