import { Client } from 'pg';
import bcrypt from 'bcrypt';
import {
  sqlInsert,
} from 'database/util';
import { AccountType, PersonType } from '../..';

export default async (account: AccountType, patient: PersonType, client: Client): Promise<void> => {
  const {
    id,
    email,
    password,
  } = account;

  const {
    id: patientId,
    name,
  } = patient;

  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  if (!id && !patientId) {
    const accountResult = await sqlInsert({
      table: 'account',
      values: {
        email: email,
        password: encryptedPassword,
      },
      client: client,
    });
    await sqlInsert({
      table: 'person',
      values: {
        name: name,
        account_id: accountResult.id,
      },
      client: client,
    });
  }
};
