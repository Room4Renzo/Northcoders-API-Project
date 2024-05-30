const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const endPoints = require("../endpoints.json");

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
      .then(({ body }) => {
        const output = body.endPoints;
        expect(output).toEqual(endPoints);
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("responds with a 200 status code and article information fetched by id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("responds with a 404 error code when passed a valid but non existent id", () => {
    return request(app)
    .get("/api/articles/9000")
    .expect(404)
    .then(({body}) => {

      
      expect(body.msg).toBe('article id does not exist');

    })
  })
  test("responds with a 400 error code when passed an invalid id", () => {
    return request(app)
    .get("/api/articles/not-an-article")
    .expect(400)
    .then(({body}) => {

      
      expect(body.msg).toBe('Bad request');

    })

})
})
