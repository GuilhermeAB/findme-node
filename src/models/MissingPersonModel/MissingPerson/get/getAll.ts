import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { MissingPersonType } from '../..';

export default async (client: Client): Promise<{ list: MissingPersonType[], }> => {
  const result = await sqlQuery({
    query: 'select m.id, m.name, m.birth_date, m.disappearance_date, m.gender_id, m.creation_datetime, m.details, m.lat_long, m.account_id, a.email from missing_person m join account a on a.id = m.account_id',
    client: client,
  });

  return {
    list: result,
  };
};
