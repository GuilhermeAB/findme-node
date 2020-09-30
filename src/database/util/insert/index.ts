/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Client } from 'pg';
import sqlQuery from '../query';

export default async (options: { table: string, values: Record<string, any>, client: Client, }): Promise<any> => {
  const { table, values, client } = options;
  let query = `insert into ${table} (${Object.keys(values).toString()}) values (`;

  const params: any[] = [];
  const { length } = Object.values(values);
  Object.values(values).forEach((value: any, index: number) => {
    if (value instanceof Date) {
      query += `(to_timestamp(${value.getTime()} / 1000.0))`;
    } else {
      query += `$${index + 1}`;
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

  query += ') RETURNING *;';

  const resolve = await sqlQuery({ query: query, params: params, client: client });
  return resolve[0];
};
