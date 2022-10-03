import express from "express";
import Controller from "../controller/CustomersController";
import { container } from "../inversify.config";

const controller = container.resolve(Controller);

const customersRouter = express.Router();

customersRouter.get("/", controller.getAll);
customersRouter.get("/:customerId/gifts", controller.giftElegibility);

export default customersRouter;
