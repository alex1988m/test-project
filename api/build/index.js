"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_factory_1 = __importDefault(require("./db/db-factory"));
const GTrendsFactory_1 = __importDefault(require("./g-trends/GTrendsFactory"));
const ProxyService_1 = require("./proxy/ProxyService");
const GTApi_1 = require("./g-trends/GTApi");
const ClientFacade_1 = require("./client/ClientFacade");
const LoggerFactory_1 = require("./logger/LoggerFactory");
const CancellableGTrendsDecorator_1 = require("./g-trends/decorator/CancellableGTrendsDecorator");
const logger = LoggerFactory_1.LoggerFactory.getInstance('MainModule');
async function main() {
    logger.info('setup db service');
    const db = await db_factory_1.default.getInstance();
    logger.info('setup proxy service');
    const ps = new ProxyService_1.ProxyService();
    logger.info('setup g-trends service');
    const gtApi = new GTApi_1.GTApi();
    const cancellableGtApi = new CancellableGTrendsDecorator_1.CancellableDecorator(gtApi);
    const GTrendsAdapter = GTrendsFactory_1.default.getClient();
    const gt = new GTrendsAdapter(cancellableGtApi, ps);
    logger.info('start client');
    const client = new ClientFacade_1.ClientFacade(gt, db);
    logger.info('start application...');
    client.start();
}
main().catch(logger.error);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpRUFBOEM7QUFDOUMsK0VBQXVEO0FBTXZELHVEQUFvRDtBQUNwRCw0Q0FBeUM7QUFDekMsd0RBQXFEO0FBRXJELDBEQUF1RDtBQUV2RCxrR0FBd0Y7QUFFeEYsTUFBTSxNQUFNLEdBQVksNkJBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFaEUsS0FBSyxVQUFVLElBQUk7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEMsTUFBTSxFQUFFLEdBQVEsTUFBTSxvQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXBELE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuQyxNQUFNLEVBQUUsR0FBVyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUV0QyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsTUFBTSxLQUFLLEdBQVcsSUFBSSxhQUFLLEVBQUUsQ0FBQztJQUNsQyxNQUFNLGdCQUFnQixHQUFHLElBQUksa0RBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsTUFBTSxjQUFjLEdBQUcsd0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsRCxNQUFNLEVBQUUsR0FBYSxJQUFJLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU5RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sTUFBTSxHQUFZLElBQUksMkJBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFakQsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9