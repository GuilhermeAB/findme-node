import { Client } from 'pg';

export default async (options: { query: string, params?: any[], client: Client, }): Promise<any> => {
  const { query, params, client } = options;

  const { rows } = await client.query(query, params);
  return rows;
};
