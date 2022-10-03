import { Model } from "objection";
import Customer from "./Customer";

class Pet extends Model {
  [x: string]: any;
  // Table name is the only required property.
  static get tableName() {
    return "pets";
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: "object",
      required: ["ownerId", "name"],

      properties: {
        id: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        ownerId: { type: "string" },
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
          from: "pets.ownerId",
          to: "customers.id",
        },
      },
    };
  }
}

export default Pet;
