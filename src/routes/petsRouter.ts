import express from "express";
import Controller from "../controller/PetsController";
import { container } from "../inversify.config";

const controller = container.resolve(Controller);

const petsRouter = express.Router();

petsRouter.get("/", controller.getAll);

export default petsRouter;
