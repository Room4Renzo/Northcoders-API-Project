const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");

beforeAll(() => seed(data));
afterAll(() => {
   return db.end()});

describe("GET /api/topics", () => {
  test("responds with a 200 status code", function () {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({body}) => {
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

//   expect(app).toHaveLength(3);
//   topics.forEach((topic) => {
//       expect(topic).toEqual(
//           expect.objectContaining({
//               description: expect.any(String),
//               slug: expect.any(String),
