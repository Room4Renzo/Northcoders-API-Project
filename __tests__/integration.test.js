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
        const topics = body.topics;
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
      .then(({ body }) => {
        expect(body.msg).toBe("article id does not exist");
      });
  });
  test("responds with a 400 error code when passed an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
describe("GET /api/articles", () => {
  test("responds with a 200 status code and an array of all available article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
            })
          );
        });
      });
  });
  test("Should return with comment count of each article", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body;
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
});
describe("GET /api/article/:article_id/comments", () => {
  test("Should return with a 200 status code and an array of available comments for given article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body;
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              author: expect.any(String),
              created_at: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("200 inserts a new comment to the db and sends the new comment back to the client", () => {
    const newComment = {
      username: "",
      body: "",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(200)
      .then(( body ) => {
        const comment = body;
        expect(comment).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            username: expect.any(String),
            body: expect.any(String),
          })
        );
      });
  });
});
