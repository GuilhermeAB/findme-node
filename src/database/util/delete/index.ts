/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Client } from 'pg';
import sqlQuery from '../query';

export default async (options: { table: string, where: string, params?: any[], client: Client, }): Promise<any> => {
  const {
    table, where, params, client,
  } = options;
  const query = `delete from ${table} ${where}`;

  await sqlQuery({ query: query, params: params, client: client });
};
