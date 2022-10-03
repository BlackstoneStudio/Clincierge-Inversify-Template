// we should not need to import "reflect-metadata" here, 
// but there is a bug which requires it.
import "reflect-metadata";
import { inject, injectable } from "inversify";
import Customer from "../../model/Customer";
import DAO from "../base-classes/DAO";

@injectable()
class CustomersDAO extends DAO<Customer> {
  constructor(
    @inject("Customer")
    protected readonly _customer: typeof Customer
  ) {
    super(_customer);
  }
}

export default CustomersDAO;
