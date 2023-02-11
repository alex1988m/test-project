export const setCurrentProxy = `
    update proxies set status=1 where id = (
        select id from proxies order by id limit 1
    );
`;
