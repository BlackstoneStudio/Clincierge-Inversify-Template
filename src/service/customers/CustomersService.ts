import { injectable } from "inversify";
import Service from "../base-classes/Service";
import CustomersDAO from "../../dao/customers/CustomersDAO";
import Customer from "../../model/Customer";

@injectable()
class CustomersService extends Service<Customer> {
  constructor(protected readonly _customersDAO: CustomersDAO) {
    super(_customersDAO);
  }
}

export default CustomersService;
