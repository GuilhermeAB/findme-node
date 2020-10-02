import { Client } from 'pg';
import {
  sqlInsert, sqlUpdate,
} from 'database/util';
import { MissingPersonType } from '../..';

export default async (missingPerson: MissingPersonType, client: Client): Promise<void> => {
  const {
    id,
    name,
    birthDate,
    disappearanceDate,
    genderId,
    accountId,
    details,
  } = missingPerson;

  if (!id) {
    await sqlInsert({
      table: 'missing_person',
      values: {
        name: name,
        birth_date: birthDate,
        disappearance_date: disappearanceDate,
        gender_id: genderId,
        account_id: accountId,
        details: details,
      },
      client: client,
    });
  } else {
    await sqlUpdate({
      table: 'missing_person',
      values: {
        name: name,
        birth_date: birthDate,
        disappearance_date: disappearanceDate,
        gender_id: genderId,
        account_id: accountId,
        details: details,
      },
      where: 'where id = $1',
      whereParams: [id],
      client: client,
    });
  }
};
