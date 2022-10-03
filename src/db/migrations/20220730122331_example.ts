import { Knex } from "knex";

export const up = async (knex: Knex) => {
  // await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  // `);
  // await knex.schema.createTable("persons", (table) => {
  //   table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
  //   table.timestamps(true, true);
  //   table.string("first_name");
  //   table.string("last_name");
  //   table.string("middle_name");
  //   table.string("email");
  // });
};

export const down = async (knex: Knex) => {
  // await knex.schema.dropTable("persons");
  // await knex.raw('DROP EXTENSION "uuid-ossp";');
};
