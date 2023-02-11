"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertRowsQuery = void 0;
const insertRowsQuery = (type) => `INSERT INTO data_${type} (keyword, city, value) VALUES %L`;
exports.insertRowsQuery = insertRowsQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LXJvd3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvcXVlcmllcy9pbnNlcnQtcm93cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBTyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsb0JBQW9CLElBQUksbUNBQW1DLENBQUM7QUFBaEcsUUFBQSxlQUFlLG1CQUFpRiJ9