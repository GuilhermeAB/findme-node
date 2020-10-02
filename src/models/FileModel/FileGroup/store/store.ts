import { Client } from 'pg';
import {
  sqlQuery,
} from 'database/util';

export default async (client: Client): Promise<number> => {
  const resolve = await sqlQuery({
    query: 'insert into file_group default values returning *',
    client: client,
  });

  return resolve[0].id;
};
