/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Client } from 'pg';
import sqlQuery from '../query';

export default async (options: { table: string, values: Record<string, any>, where: string, whereParams: any[], client: Client, }): Promise<any> => {
  const {
    table, values, where, whereParams, client,
  } = options;

  let query = `update ${table} set `;

  const params: any[] = [];
  const { length } = Object.keys(values);
  Object.keys(values).forEach((key: string, index: number) => {
    const value = values[key];
    if (value instanceof Date) {
      query += `${key} = (to_timestamp(${value.getTime()} / 1000.0))`;
    } else {
      query += `${key} = $${index + 1 + whereParams.length}`;
    }
    if (index < length - 1) {
      query += ', ';
    }

    if (typeof value === 'number' || value == null || value === undefined) {
      params.push(value === undefined ? null : value);
    } else if (!(value instanceof Date)) {
      params.push(value);
    }
  });
  query += ` ${where} RETURNING *;`;

  const resolve = await sqlQuery({ query: query, params: [...whereParams, ...params], client: client });
  return resolve[0];
};
