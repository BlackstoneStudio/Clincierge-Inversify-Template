import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("pets", (table) => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamps(true, true);
    table.string("name");
    table.string("ownerId");
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable("pets");
};
