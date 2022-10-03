import chai from "chai";
import sinon, { SinonStub } from "sinon";
import DAO from "../DAO";
import { Model, PartialModelObject } from "objection";
import { v4 as uuidv4 } from "uuid";

const { expect } = chai;
const sandbox = sinon.createSandbox();

// creating an interface is not ideal, but it's necessary due to 
// limitations with stubbing the Objection.Model instance passed to the DAO
// for a better test implementation, see Service.test.ts
interface Methods {
  query: SinonStub<any, Methods>;
  insert: SinonStub<any, Methods>;
  insertGraph: SinonStub<any, Methods>;
  findById: SinonStub<any, Methods>;
  truncate: SinonStub<any, Methods>;
  delete: SinonStub<any, Methods>;
  deleteById: SinonStub<any, Methods>;
  where: SinonStub<any, Methods>;
  patch: SinonStub<any, Methods>;
  returning: SinonStub<any, Methods>;
  first: SinonStub<any, Methods>;
  patchAndFetchById: SinonStub<any, Methods>;
  giftEligibility: SinonStub<any, Methods>;
  getPetsByCustomerId: SinonStub<any, Methods>;
}

describe("src :: dao :: base-classes :: DAO", () => {
  let methods: Methods;
  let dao: DAO<Model>;

  beforeEach(() => {
    methods = {
      query: sandbox.stub(),
      insert: sandbox.stub(),
      insertGraph: sandbox.stub(),
      findById: sandbox.stub(),
      truncate: sandbox.stub(),
      delete: sandbox.stub(),
      deleteById: sandbox.stub(),
      where: sandbox.stub(),
      patch: sandbox.stub(),
      returning: sandbox.stub(),
      first: sandbox.stub(),
      patchAndFetchById: sandbox.stub(),
      giftEligibility: sandbox.stub(),
      getPetsByCustomerId: sandbox.stub()
    };

    dao = new DAO(methods as any);
  });

  afterEach(() => {
    sandbox.reset();
  });
  describe("# getAll", () => {
    it("should call the query method", async () => {
      // arrange
      methods.query.resolves([]);
      // act
      const result = await dao.getAll();
      // assert
      sandbox.assert.calledOnce(methods.query);
      expect(result).to.deep.equal([]);
    });
  });
  describe("# insert", () => {
    it("creates an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.insert.returnsThis();
      methods.returning.resolves({
        id,
      });
      const options = { id };
      // act
      const result = await dao.insert(options);
      // assert
      expect(result).to.be.an("object");
      sandbox.assert.calledOnce(methods.insert);
      sandbox.assert.calledWith(methods.insert, options);
      sandbox.assert.calledOnce(methods.returning);
      sandbox.assert.calledWith(methods.returning, "*");
    });
  });
  describe("# insertGraph", () => {
    it("creates an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.insertGraph.resolves({
        id,
      });
      const graph = { id } as PartialModelObject<Model>;
      // act
      const result = await dao.insertGraph(graph);
      // assert
      expect(result).to.be.an("object");
    });
  });
  describe("# findById", () => {
    it("returns an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.findById.resolves({ id });
      // act
      const result = await dao.findById(id);
      // assert
      expect(result).to.be.an("object");
    });
  });
  describe("# truncate", () => {
    it("truncates table", async () => {
      // arrange
      methods.query.returnsThis();
      methods.truncate.resolves("SUCCESS");
      // act
      const result = await dao.truncate();
      // assert
      expect(result).to.be.a("string");
      expect(result).to.equal("SUCCESS");
    });
  });
  describe("# deleteById", () => {
    it("deletes an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.deleteById.returnsThis();
      methods.returning.resolves({ id });
      // act
      const result = await dao.deleteById(id);
      // assert
      expect(result).to.be.a("object");
      expect(result).to.deep.equal({ id });
    });
  });
  describe("# patchAndFetchById", () => {
    it("patches an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.patchAndFetchById.returnsThis();
      methods.first.resolves({});

      const patch = {
        foo: "bar",
      };
      // act
      const result = await dao.patchAndFetchById(id, patch);
      // assert
      expect(result).to.be.an("object");
      sandbox.assert.calledOnce(methods.patchAndFetchById);
      sandbox.assert.calledWith(methods.patchAndFetchById, id, patch);
    });
  });
  describe("# giftEligibility", () => {
    it("returns an instance", async () => {
      // arrange
      const customerId = uuidv4();
      const species = "bear";

      methods.query.returnsThis();
      methods.findById.returnsThis();
      methods.patch.resolves({id: customerId, giftType: species});

      // act
      const result = await dao.giftEligibility(customerId, species)
      // assert
      expect(result).to.be.an("object");
    });
  });

  describe("# getValidDates", () => {
    it("returns an instance", async () => {
      // arrange
      const customerId = uuidv4();

      methods.query.returnsThis();
      methods.where.returnsThis();
      methods.where.resolves({id: customerId});

      // act
      const result = await dao.getValidDates(customerId)
      // assert
      expect(result).to.be.an("object");
    });
  });

  describe("# getPetsByCustomerId", () => {
    it("returns an instance", async () => {
      // arrange
      const currentId = uuidv4();
      methods.query.returnsThis();
      methods.where.resolves({ owner_id: currentId });
      // act
      const result = await dao.getPetsByCustomerId(currentId);
      // assert
      expect(result).to.be.an("object");

    });
  });
});
