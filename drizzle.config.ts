import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './db/schema',
    schemaFilter: ['core'],
    out: './db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_DATABASE_URL!,
    },
});
