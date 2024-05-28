const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const Test = require("supertest/lib/test");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("responds with a 200 status code", () => {
    return request(app).get("/api/topics");
    Test.expect(200);
  });
  test("Call to endpoint should return array of all topic objects", () => {
    return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
      expect(topics).toHaveLength(3);
      topics.forEach((topic) => {
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
