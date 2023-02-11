"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFacade = void 0;
const LoggerFactory_1 = require("../logger/LoggerFactory");
class ClientFacade {
    constructor(gt, db) {
        this.gt = gt;
        this.db = db;
        this.logger = LoggerFactory_1.LoggerFactory.getInstance('ClientFacade');
    }
    start() {
        // setTimeout(
        //     async () => await this.getKeywordInfo(),
        //     1
        // );
        setInterval(async () => await this.getKeywordInfo(), +process.env.INTERVAL || 20000);
    }
    async getKeywordInfo() {
        try {
            const keyWord = process.env.KEYWORD || 'bmw';
            const data = await this.gt.getTrends(keyWord);
            if (data)
                await this.db.insertRows(data);
        }
        catch (e) {
            this.logger.error(JSON.stringify(e));
        }
    }
}
exports.ClientFacade = ClientFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50RmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9DbGllbnRGYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkRBQXdEO0FBR3hELE1BQWEsWUFBWTtJQUVyQixZQUNZLEVBQVksRUFDWixFQUFPO1FBRFAsT0FBRSxHQUFGLEVBQUUsQ0FBVTtRQUNaLE9BQUUsR0FBRixFQUFFLENBQUs7UUFIWCxXQUFNLEdBQVksNkJBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFJaEUsQ0FBQztJQUVMLEtBQUs7UUFDRCxjQUFjO1FBQ2QsK0NBQStDO1FBQy9DLFFBQVE7UUFDUixLQUFLO1FBQ0wsV0FBVyxDQUNQLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQ3ZDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVPLEtBQUssQ0FBQyxjQUFjO1FBQ3hCLElBQUk7WUFDQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7WUFDN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLElBQUk7Z0JBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QztRQUFDLE9BQU8sQ0FBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7Q0FDSjtBQTNCRCxvQ0EyQkMifQ==