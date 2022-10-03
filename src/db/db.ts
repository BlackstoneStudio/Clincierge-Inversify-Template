import knexjs from 'knex';
import knexFile from './knexFile';

const db = knexjs(knexFile);

export default db;

export type Db = typeof db;
