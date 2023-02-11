"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(service) {
        this.service = service;
        this.isDebug = process.env.DEBUG === 'true';
    }
    getCurrentTime() {
        return new Date().toTimeString().split(' ')[0];
    }
    debug(message) {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];
        this.isDebug && console.info(messages.join('\t'));
    }
    info(message) {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];
        console.info(messages.join('\t'));
    }
    error(message) {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];
        console.error(messages.join('\t'));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlci9Mb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBYSxNQUFNO0lBRWYsWUFBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEM0IsWUFBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQztJQUNSLENBQUM7SUFFaEMsY0FBYztRQUNsQixPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZTtRQUNqQixNQUFNLFFBQVEsR0FBRztZQUNiLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU87WUFDWixPQUFPO1NBQ1YsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlO1FBQ2hCLE1BQU0sUUFBUSxHQUFHO1lBQ2IsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTztZQUNaLE9BQU87U0FDVixDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlO1FBQ2pCLE1BQU0sUUFBUSxHQUFHO1lBQ2IsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTztZQUNaLE9BQU87U0FDVixDQUFDO1FBRUYsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNKO0FBckNELHdCQXFDQyJ9