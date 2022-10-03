import Objection, { PartialModelObject, QueryBuilder, raw } from "objection";

class DAO<T extends Objection.Model> {
  constructor(protected readonly model: typeof Objection.Model) {
    this.model = model;
  }

  async getAll() {
    return this.model.query() as QueryBuilder<T>;
  }

  // NOTE: The return value of the insert query only contains the properties given to the insert method plus the identifier.
  // This is because we don't make an additional fetch query after the insert. Using postgres you can chain returning('*') to the query to get all properties
  // NOTE: As of 2022, only Postgres supports passing an array of objects to insert
  async insert(options: PartialModelObject<T> | PartialModelObject<T>[]) {
    return this.model
      .query()
      .insert(options)
      .returning("*") as unknown as QueryBuilder<T, T[]>;
  }

  async insertGraph(
    graph: Objection.PartialModelGraph<T, T & Objection.GraphParameters>
  ) {
    return this.model.query().insertGraph(graph);
  }

  async findById(id: string) {
    return this.model.query().findById(id);
  }

  async truncate() {
    return this.model.query().truncate();
  }

  async deleteById(id: string) {
    return this.model.query().deleteById(id).returning("*");
  }

  async patchAndFetchById(id: string, patch: Objection.PartialModelObject<T>) {
    return this.model.query().patchAndFetchById(id, patch);
  }

  giftEligibility(customerId: string, species: string) {
    return this.model.query().findById(customerId).patch({
      gift_type: species,
    });
  }

  getValidDates(id: string) {
    return this.model
      .query()
      .where("date", "<=", raw("NOW() - '6 MONTH'::INTERVAL"))
      .where("customer_id", "=", id);
  }

  getPetsByCustomerId(customerId: string) {
    return this.model.query().where("owner_id", "=", customerId);
  }
}

export default DAO;
