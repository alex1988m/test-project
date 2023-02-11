"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighGTrendsClient = void 0;
const AbstractGTrends_1 = require("./AbstractGTrends");
class HighGTrendsClient extends AbstractGTrends_1.AbstractGTrendsAdapter {
    isValidData(data) {
        return data.every(({ value }) => true);
        // return data.every(({ value }) => value === 100 || value < 40);
    }
}
exports.HighGTrendsClient = HighGTrendsClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlnaEdUcmVuZHNDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZy10cmVuZHMvSGlnaEdUcmVuZHNDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdURBQTJEO0FBRTNELE1BQ1UsaUJBQWtCLFNBQVEsd0NBQXNCO0lBQzVDLFdBQVcsQ0FBQyxJQUFvQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxpRUFBaUU7SUFDckUsQ0FBQztDQUNKO0FBTkQsOENBTUMifQ==