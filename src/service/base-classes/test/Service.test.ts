import chai from "chai";
import sinon, { SinonStubbedInstance } from "sinon";
import DAO from "../../../dao/base-classes/DAO";
import { Model } from "objection";
import { v4 as uuidv4 } from 'uuid';

// file under test
import Service from "../Service";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("src :: service :: base-classes :: Service", () => {
  // test double variables (stubs))
  let dao: SinonStubbedInstance<DAO<Model>>;

  let service: Service<Model>;
  beforeEach(() => {
    dao = sandbox.createStubInstance(DAO);
    dao.getAll = sandbox.stub();
    dao.insert = sandbox.stub();
    dao.insertGraph = sandbox.stub();
    dao.findById = sandbox.stub();
    dao.truncate = sandbox.stub();
    dao.deleteById = sandbox.stub();
    dao.patchAndFetchById = sandbox.stub();

    service = new Service(dao);
  });

  afterEach(() => {
    sandbox.restore();
    sandbox.reset();
  });
  describe("# getAll", () => {
    it("calls DAOs query method", async () => {
      // arrange
      dao.getAll.resolves([]);
      // act
      const result = await service.getAll();
      // assert
      sandbox.assert.calledOnce(dao.getAll);
      expect(result).to.deep.equal([]);
    });
  });

  describe("insert", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const options = {};
      // act
      await service.insert(options);
      // assert
      sandbox.assert.calledOnce(dao.insert);
      sandbox.assert.calledWith(dao.insert, options);
    });
  });
  describe("insertGraph", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const options = {};
      // act
      await service.insertGraph(options);
      // assert
      sandbox.assert.calledOnce(dao.insertGraph);
      sandbox.assert.calledWith(dao.insertGraph, options);
    });
  });
  describe("findById", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const id = uuidv4();
      // act
      await service.findById(id);
      // assert
      sandbox.assert.calledOnce(dao.findById);
      sandbox.assert.calledWith(dao.findById, id);
    });
  });
  describe("truncate", () => {
    it("calls DAO with expected method", async () => {
      // arrange
      // act
      await service.truncate();
      // assert
      sandbox.assert.calledOnce(dao.truncate);
    });
  });
  describe("deleteById", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const id = uuidv4();
      // act
      await service.deleteById(id);
      // assert
      sandbox.assert.calledOnce(dao.deleteById);
      sandbox.assert.calledWith(dao.deleteById, id);
    });
  });
  describe("patchAndFetchById", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const id = uuidv4();
      const options = {};
      // act
      await service.patchAndFetchById(id, options);
      // assert
      sandbox.assert.calledOnce(dao.patchAndFetchById);
      sandbox.assert.calledWith(dao.patchAndFetchById, id, options);
    });
  });
});
