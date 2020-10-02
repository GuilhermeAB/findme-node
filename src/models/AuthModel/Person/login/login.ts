import { Client } from 'pg';
import { sqlQuery, sqlUpdate } from 'src/database/util';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AccountType, PersonType } from '../..';

export default async (email: string, password: string, client: Client): Promise<{ account: AccountType, person?: PersonType, token?: any, }> => {
  const result = await sqlQuery({
    query: 'select a.id as account_id, a.email, a.password, a.creation_date, a.update_date, a.last_login, p.id as person_id, p.name from account a join person p on p.id = a.id where a.email = $1',
    params: [email],
    client: client,
  });

  const account = result && result[0];
  if (!account) {
    throw new Error('E-mail informado invalido ou não cadastrado');
  } else if (!bcrypt.compareSync(password, account.password)) {
    throw new Error('E-mail ou senha inválidos');
  }

  await sqlUpdate({
    table: 'account',
    values: {
      last_login: new Date(),
    },
    where: 'where id = $1',
    whereParams: [account.account_id],
    client: client,
  });

  const secretKey = process.env.SECRET_TOKEN_KEY || '';
  const secretKeyTimeout = parseInt(process.env.SECRET_TOKEN_TIMEOUT || '6000', 10);
  const token = jwt.sign({ id: account.account_id, name: account.name }, secretKey, {
    algorithm: 'HS256',
    expiresIn: secretKeyTimeout,
  });

  return {
    account: {
      id: account.account_id,
      email: account.email,
      creationDate: account.creation_date,
      updateDate: account.update_date,
      lastLogin: account.last_login,
    },
    person: {
      id: account.person_id,
      name: account.name,
    },
    token: token,
  };
};
