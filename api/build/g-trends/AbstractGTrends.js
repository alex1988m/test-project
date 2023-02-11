"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGTrendsAdapter = void 0;
const LoggerFactory_1 = require("../logger/LoggerFactory");
const https_proxy_agent_1 = require("https-proxy-agent");
class AbstractGTrendsAdapter {
    constructor(gtApi, ps) {
        this.gtApi = gtApi;
        this.ps = ps;
        this.logger = LoggerFactory_1.LoggerFactory.getInstance('GTrendsAdapter');
    }
    toPayload(results) {
        try {
            this.logger.debug('transform to payload:');
            const result = JSON.parse(results).default.geoMapData
                .filter(({ value }) => value[0] > 0)
                .sort((a, b) => +b.value[0] - +a.value[0])
                .map(({ value, geoName }) => ({ city: geoName, value: +value[0] }));
            this.logger.debug('success transform');
            this.logger.debug(`results: ${JSON.stringify(result)}`);
            return result;
        }
        catch (e) {
            this.logger.error('unable to transform response');
            throw e;
        }
    }
    async getTrends(keyWord) {
        this.logger.debug('setup proxy agent:');
        const agent = await this.getAgent();
        try {
            this.logger.debug(`requesting...`);
            const response = await this.gtApi.get(agent, keyWord);
            this.logger.debug('success');
            const data = this.toPayload(response);
            if (this.isValidData(data))
                return data;
        }
        catch (e) {
            this.logger.info(`Error: ${e.message || 'unknown error!'}`);
            this.logger.info('updating current proxy...');
            await this.ps.update();
        }
    }
    ;
    async getAgent() {
        const proxy = await this.ps.get();
        const proxyURL = `http://${proxy}`;
        const agent = new https_proxy_agent_1.HttpsProxyAgent(proxyURL);
        this.logger.info(`proxy url: ${proxyURL}`);
        return agent;
    }
}
exports.AbstractGTrendsAdapter = AbstractGTrendsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RHVHJlbmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ctdHJlbmRzL0Fic3RyYWN0R1RyZW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSwyREFBd0Q7QUFDeEQseURBQW9EO0FBRXBELE1BQXNCLHNCQUFzQjtJQUd4QyxZQUFvQixLQUFhLEVBQVUsRUFBVTtRQUFqQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUY3QyxXQUFNLEdBQVksNkJBQWEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUViLENBQUM7SUFJbEQsU0FBUyxDQUFDLE9BQWU7UUFDN0IsSUFBSTtZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDM0MsTUFBTSxNQUFNLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVTtpQkFDN0QsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEQsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLENBQUM7U0FDWDtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWU7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4QyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQyxJQUFJO1lBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQzNDO1FBQUMsT0FBTyxDQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFXLENBQUMsT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFBQSxDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVE7UUFDbEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFLENBQUM7UUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQ0FBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUE5Q0Qsd0RBOENDIn0=