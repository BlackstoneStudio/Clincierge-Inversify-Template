import { Knex } from "knex";

export const up = (knex: Knex) => {
  return knex.schema.alterTable("pets", (table) => {
    table.string("species");
  });
};

export const down = (knex: Knex) =>
  knex.schema.alterTable("pets", (table) => {
    table.dropColumn("species");
  });
