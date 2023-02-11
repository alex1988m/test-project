// const gtrends = require('google-trends-api');
const gtrends = require('./google-trends-api.min.js');

const gtrendsConfig = {
    keyword: process.env.KEYWORD || 'bmw',
    startTime: new Date(Date.now() - (1 * 60 * 60 * 1000)),
    granularTimeResolution: true,
    timezone: new Date().getTimezoneOffset(),
    resolution: 'CITY',
    lowSearch: true,
};

function transform(results) {
    return JSON.parse(results).default.geoMapData
        .filter(({ value }) => value[0] > 0)
        .sort((a, b) => +b.value[0] - +a.value[0])
        .map(({ value, geoName }) => ({ city: geoName, value: +value[0] }));
}

async function main() {
    const results = await gtrends.interestByRegion({ ...gtrendsConfig, agent: this.proxyAgent });
    const finalResult = transform(results);
    console.log('finalResult:', finalResult);
    debugger;
}

main();