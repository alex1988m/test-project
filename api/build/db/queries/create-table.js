"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = void 0;
const createTable = (type) => `create table if not exists data_${type} (
    id int PRIMARY KEY GENERATED ALWAYS as IDENTITY,
    keyword varchar(55) NOT NULL,
    city varchar(55) NOT NULL,
    value int,
    time timestamp with time zone default current_timestamp
);`;
exports.createTable = createTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL3F1ZXJpZXMvY3JlYXRlLXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxtQ0FBbUMsSUFBSTs7Ozs7O0dBTWpGLENBQUM7QUFOUyxRQUFBLFdBQVcsZUFNcEIifQ==