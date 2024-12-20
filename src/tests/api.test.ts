import request from "supertest";
import express from "express";
import adminRoutes from "../routes/admin";
import userRoutes from "../routes/user";
import { getDataSource } from "../config/database";
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';

const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

let connection : any; // Declare a variable to hold the DB connection

beforeAll(async () => {
  if (!connection) { // Check if the connection is not already established
    connection = await getDataSource();
  }
});

afterAll(async () => {
  if (connection) {
    await connection.destroy(); // Destroy the connection after tests
  }
});

describe("Admin Endpoints", () => {
  it("should add a new grocery item", async () => {
    const response = await request(app).post("/admin/add").send({
      "name": "Banana",
      "price": 1.2,
      "inventory": 50,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("banana");
  });

  it("should add a new grocery item", async () => {
    const response = await request(app).post("/admin/add").send({
      "name": "Apple",
      "price": 1.2,
      "inventory": 150,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("apple");
  });

  it("should add a new grocery item", async () => {
    const response = await request(app).post("/admin/add").send({
      "name": "Cabage",
      "price": 1.49,
      "inventory": 50,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Cabage");
  });

  it("should add a new grocery item", async () => {
    const response = await request(app).post("/admin/add").send({
      "name": "curd",
      "price": 0.79,
      "inventory": 84,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("curd");
  });

  it("should list all grocery items", async () => {
    const response = await request(app).get("/admin/list");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should update a grocery item", async () => {
    const response = await request(app).put("/admin/update/cabage").send({
      "name":"cabage",
      "price": 1.29,
      "inventory": 50,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("banana");
  });

  it("should remove a grocery item", async () => {
    const response = await request(app).delete("/admin/remove/cabage");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Grocery item removed successfully");
  });
});

describe("User Endpoints", () => {
  it("should view available groceries", async () => {
    const response = await request(app).get("/user/list");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should book groceries", async () => {
    const response = await request(app)
      .post("/user/book")
      .send({
        "items": [{ "name":"apple", "quantity": 40}],
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Groceries booked successfully");
  });
});
