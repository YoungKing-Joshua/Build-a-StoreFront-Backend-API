import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  POSTGRES_DB_TEST,
} = process.env;

let poolConfig: PoolConfig;

if (ENV === 'dev') {
  poolConfig = {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  };
} else if (ENV === 'test') {
  poolConfig = {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_TEST,
  };
} else {
  throw new Error('Invalid environment');
}

const client = new Pool(poolConfig);

export default client;
