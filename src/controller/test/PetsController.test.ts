import chai from "chai";
import sinon, { SinonSpy, SinonStubbedInstance } from "sinon";
import { Request, Response, NextFunction } from "express";
import Controller from "../PetsController";
import Service from "../../service/pets/PetsService";
import ApiError from "../../middleware/ApiError";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("src :: controller :: PetsController", () => {
  let service: SinonStubbedInstance<Service>;
  let controller: Controller;

  let res: Partial<Response>;
  let req: Partial<Request>;
  let next: SinonSpy;

  beforeEach(() => {
    service = sandbox.createStubInstance(Service);
    service.getAll = sandbox.stub();

    controller = new Controller(service);

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
});
