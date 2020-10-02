import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { MissingPersonType } from '../..';

export default async (client: Client): Promise<{ list: MissingPersonType[], }> => {
  const result = await sqlQuery({
    query: 'select m.id, m.name, m.birth_date, m.disappearance_date, m.gender_id, m.creation_datetime, m.details, m.lat_long, m.account_id, m.file_group_id, a.email from missing_person m join account a on a.id = m.account_id',
    client: client,
  });

  if (result && result.length) {
    const { length } = result;
    for (let i = 0; i < length; i++) {
      result[i].imageList = await sqlQuery({
        query: 'select id, file_group_id, name, file_type from file where file_group_id = $1',
        params: [result[i].file_group_id],
        client: client,
      });
    }
  }

  return {
    list: result,
  };
};
