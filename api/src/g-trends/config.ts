export const gtrendsConfig = {
    startTime: new Date(Date.now() - (1 * 60 * 60 * 1000)),
    granularTimeResolution: true,
    timezone: new Date().getTimezoneOffset(),
    resolution: 'CITY',
    lowSearch: process.env.TYPE === 'low',
};
