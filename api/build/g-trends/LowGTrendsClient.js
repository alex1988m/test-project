"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowGTrendsClient = void 0;
const AbstractGTrends_1 = require("./AbstractGTrends");
class LowGTrendsClient extends AbstractGTrends_1.AbstractGTrendsAdapter {
    isValidData(data) {
        return data.every(({ value }) => true);
        // return data.every(({ value }) => value === 100 || value < 40);
    }
}
exports.LowGTrendsClient = LowGTrendsClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG93R1RyZW5kc0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nLXRyZW5kcy9Mb3dHVHJlbmRzQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVEQUEyRDtBQUUzRCxNQUFhLGdCQUFpQixTQUFRLHdDQUFzQjtJQUM5QyxXQUFXLENBQUMsSUFBb0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsaUVBQWlFO0lBQ3JFLENBQUM7Q0FDSjtBQUxELDRDQUtDIn0=