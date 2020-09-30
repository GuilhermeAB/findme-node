/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Pool, ClientConfig } from 'pg';

require('dotenv').config();

const databaseConfig: ClientConfig = {
  user: process.env.DATABASE_USER_USERNAME,
  password: process.env.DATABASE_USER_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT ? process.env.DATABASE_PORT : '', 10),
};

const pool = new Pool(databaseConfig);

export const t = async (callback: any): Promise<any> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    try {
      await callback(client);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');

      throw e;
    }
  } finally {
    client.release();
  }
};
