export const createIpListTable = `
    create table if not exists ip 
    (
        id int primary key generated always as identity,
        address varchar(50) not null,
        date timestamp with time zone default current_timestamp
    );
`;
