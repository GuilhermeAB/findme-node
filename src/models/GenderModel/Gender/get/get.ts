import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { GenderType } from '../..';

export default async (client: Client): Promise<{ list: GenderType[], }> => {
  const result = await sqlQuery({
    query: 'select id, description from gender',
    client: client,
  });

  return {
    list: result,
  };
};
