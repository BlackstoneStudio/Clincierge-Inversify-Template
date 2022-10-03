import { inject, injectable } from "inversify";
import Pet from "../../model/Pet";
import DAO from "../base-classes/DAO";

@injectable()
class PetDAO extends DAO<Pet> {
  constructor(
    @inject("Pet")
    protected readonly _pet: typeof Pet
  ) {
    super(_pet);
  }
}

export default PetDAO;
