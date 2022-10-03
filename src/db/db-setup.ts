import knex from 'knex';
import knexFile from './knexFile';
import { Model } from 'objection';

const setupDb = () => {
  const db = knex(knexFile);

  // plug db config into objection
  Model.knex(db);
};

export default setupDb;
