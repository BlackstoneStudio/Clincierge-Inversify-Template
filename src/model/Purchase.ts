import { Model } from "objection";
import Customer from "./Customer";

class Purchase extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "purchases";
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: "object",
      required: ["customerId", "date", "total"],

      properties: {
        id: { type: "string" },
        customerId: { type: "string" },
        date: { type: "date" },
        total: { type: "number" },
      },
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      owners: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: "purchases.customerId",
          to: "customers.id",
        },
      },
    };
  }
}

export default Purchase;
