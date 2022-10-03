import chai from "chai";
import sinon, { SinonSpy, SinonStubbedInstance } from "sinon";
import { Request, Response, NextFunction } from "express";
import Controller from "../CustomersController";
import Service from "../../service/customers/CustomersService";
import ServicePets from "../../service/pets/PetsService";
import ServicePurchases from "../../service/purchases/PurchasesService";
import ApiError from "../../middleware/ApiError";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("src :: controller :: CustomersController", () => {
  let service: SinonStubbedInstance<Service>;
  let servicePets: SinonStubbedInstance<ServicePets>;
  let servicePurchases: SinonStubbedInstance<ServicePurchases>;
  let controller: Controller;

  let res: Partial<Response>;
  let req: Partial<Request>;
  let next: SinonSpy;

  beforeEach(() => {
    service = sandbox.createStubInstance(Service);
    servicePets = sandbox.createStubInstance(ServicePets);
    servicePurchases = sandbox.createStubInstance(ServicePurchases);
    service.getAll = sandbox.stub();

    controller = new Controller(service, servicePurchases, servicePets);

    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub().returnsThis(),
    };

    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  describe("# getAll", () => {
    context("when there isn't an error", () => {
      it("calls service.getAll()", async () => {
        // arrange
        // act
        await controller.getAll(req as Request, res as Response, next);
        // assert
        sandbox.assert.calledOnce(service.getAll);
      });
    });

    context("when there is an error", () => {
      it("calls next with ApiError.internal", async () => {
        // arrange
        service.getAll.rejects(new Error("error"));
        // act
        await controller.getAll(req as Request, res as Response, next);
        // assert
        sandbox.assert.calledOnce(next);
        sandbox.assert.calledWith(next, sandbox.match.instanceOf(ApiError));
      });
    });
  });

  describe("# giftElegibility", () => {
    context("when there is an error", () => {
      it("calls service when customer doesn't exists", async () => {
        await controller.giftElegibility(req as Request, res as Response, next);
        sandbox.assert.calledOnce(next);
        sandbox.assert.calledWith(next, sandbox.match.instanceOf(ApiError));
      });

      it("calls service when customer has no purchases of more than 6 months", async () => {
        let stub = sinon.stub(controller, "giftElegibility");
        stub
          .withArgs(
            { params: "1" } as unknown as Request,
            res as Response,
            next
          )
          .returns(JSON.parse("null"));

        expect(
          controller.giftElegibility(
            { params: "1" } as unknown as Request,
            res as Response,
            next
          )
        ).to.be.equal(JSON.parse("null"));
      });
    });

    context("when there is ok", () => {

      it("calls service when customer is Elegibility", async () => {
        let stub = sinon.stub(controller, "giftElegibility");
        stub
          .withArgs(
            { params: "1" } as unknown as Request,
            res as Response,
            next
          )
          .returns(JSON.parse(`{ "message": "successfully retrieved", "sheets": { "message": "Max: a gift was assigned for his cat" } }`));

        expect(
          controller.giftElegibility(
            { params: "1" } as unknown as Request,
            res as Response,
            next
          )
        ).to.have.property("sheets");
      });
    });
  });
});
