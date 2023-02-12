export const createTable = (type: 'low' | 'high') => `create table if not exists data_${type} (
    id int PRIMARY KEY GENERATED ALWAYS as IDENTITY,
    keyword varchar(55) NOT NULL,
    city varchar(55) NOT NULL,
    value int,
    time timestamp with time zone default current_timestamp
);`;
