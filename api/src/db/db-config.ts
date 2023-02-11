export const defaultConfig = {
    host: process.env.DOCKER === 'false' ? "localhost" : "pg",
    user: "postgres",
    max: 20,
    database: "postgres",
    password: "lol",
    port: 5432,
    idleTimeoutMillis: 3600000,
    connectionTimeoutMillis: 60000,
};
