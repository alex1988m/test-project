export const createTable = `
    create table if not exists proxies (
    id int PRIMARY KEY GENERATED ALWAYS as IDENTITY,
    url varchar(55) NOT NULL,
    status int default 0
);`;

