import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("purchases", (table) => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamps(true, true);
    table.string("customerId");
    table.date("date");
    // note that setting precision to null is only supported by
    // Oracle, SQLite, Postgres
    table.decimal("total", null, 2);
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable("purchases");
};
