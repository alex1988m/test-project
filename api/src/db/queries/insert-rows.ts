export const insertRowsQuery = (type: string) => `INSERT INTO data_${type} (keyword, city, value) VALUES %L`;
