import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import Service from "../service/customers/CustomersService";
import ServicePurchases from "../service/purchases/PurchasesService";
import ServicePets from "../service/pets/PetsService";
import ApiError from "../middleware/ApiError";
import Customer from "../model/Customer";
import Pet from "../model/Pet";

@injectable()
class CustomersController {
  constructor(private readonly _service: Service, private readonly _servicePurchase: ServicePurchases, private readonly _servicePets: ServicePets) {
    this.getAll = this.getAll.bind(this);
    this.giftElegibility = this.giftElegibility.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.getAll();
      return res.status(200).json({
        message: "successfully retrieved",
        sheets: result,
      });
    } catch (e: unknown) {
      let message;
      let stack;

      if (e instanceof Error) {
        message = e.message;
        stack = e.stack;
      } else {
        message = JSON.stringify(e);
        stack = "CustomersController.getAll()";
      }

      next(ApiError.internal(message));
    }
  }

  async giftElegibility(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await this._service.findById(req.params.customerId) as Customer;
      if(!customer){
        throw new Error(`Customer not found`);
      }

      if(customer.giftType){
        return res.status(400).json(null);
      }
      
      const purchases = await this._servicePurchase.getValidDates(customer.id);

      if(!purchases.length){
        throw new Error(`Customer has no purchases of more than 6 months`);
      }
      
      const pets = await this._servicePets.getAllByCustomerId(customer.id) as Pet[];

      const petsLength = pets.length;
      
      if(!petsLength){
        throw new Error(`Customer does not have pets`);
      }

      const typePet = pets[Number((Math.random()*(petsLength-1)).toFixed())];
      
      await this._service.giftEligibility(customer.id, typePet.species);

      return res.status(200).json({
        message: "successfully retrieved",
        sheets: {
          message: `${customer.firstName} ${customer.lastName}: a gift was assigned for his ${typePet.species}`
        },
      });
    } catch (e: unknown) {
      let message;
      let stack;

      if (e instanceof Error) {
        message = e.message;
        stack = e.stack;
      } else {
        message = JSON.stringify(e);
        stack = "CustomersController.giftElegibility()";
      }

      next(ApiError.internal(message));
    }
  }
}

export default CustomersController;
