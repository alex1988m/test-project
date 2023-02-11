"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
    host: process.env.DOCKER === 'false' ? "localhost" : "pg",
    user: "postgres",
    max: 20,
    database: "postgres",
    password: "lol",
    port: 5432,
    idleTimeoutMillis: 3600000,
    connectionTimeoutMillis: 60000,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RiL2RiLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGFBQWEsR0FBRztJQUN6QixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUk7SUFDekQsSUFBSSxFQUFFLFVBQVU7SUFDaEIsR0FBRyxFQUFFLEVBQUU7SUFDUCxRQUFRLEVBQUUsVUFBVTtJQUNwQixRQUFRLEVBQUUsS0FBSztJQUNmLElBQUksRUFBRSxJQUFJO0lBQ1YsaUJBQWlCLEVBQUUsT0FBTztJQUMxQix1QkFBdUIsRUFBRSxLQUFLO0NBQ2pDLENBQUMifQ==