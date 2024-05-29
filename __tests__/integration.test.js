const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const endPoints = require('../endpoints.json')


beforeAll(() => seed(data));
afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("responds with a 200 status code", function () {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const output = body.topics;
        expect(output).toHaveLength(3);
        output.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
});
describe("GET /api", () => {
  test("responds with a 200 status code and readable nested objects for each endpoing", function () {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({body}) => {
        const output = body.endPoints
        expect(output).toEqual(endPoints)


      });
  });
});
