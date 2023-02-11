export const getCurrentProxy = `
    select url from proxies where status = 1 limit 1;
`;
