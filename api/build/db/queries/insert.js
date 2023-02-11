"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = void 0;
const insertData = (type) => `
insert into 
data_${type}
(
    keyword, city, value
)
values (
    $1, $2, $3
);
`;
exports.insertData = insertData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL3F1ZXJpZXMvaW5zZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQzs7T0FFckMsSUFBSTs7Ozs7OztDQU9WLENBQUM7QUFUVyxRQUFBLFVBQVUsY0FTckIifQ==