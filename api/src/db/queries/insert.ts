export const insertData = (type: string) => `
insert into 
data_${type}
(
    keyword, city, value
)
values (
    $1, $2, $3
);
`;
