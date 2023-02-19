export const getIpList = `
    SELECT address from ip where date >= NOW() - INTERVAL '24 hours';
`;
