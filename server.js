const express = require("express");
const path = require("path");
const fs = require("fs");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "pod.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    await db.exec(schema);

    app.get("/deliveries/", async (request, response) => {
      const { status = "" } = request.query;

      const query = `
      SELECT 
      * 
      FROM 
      deliveries 
      WHERE 
      STATUS 
      LIKE '%${status}%'
      ORDER BY id DESC;`;

      const array = await db.all(query);
      response.send(array);
    });

    app.put("/deliveries/:id", async (request, response) => {
      const { id } = request.params;
      const { status } = request.body;

      const query = `
      UPDATE 
      deliveries
      SET 
      status= ${status}
      WHERE id = ${id};`;

      await db.run(query);
      response.send("Delivery successfully Updated");
    });

    app.post("/deliveries/", async (request, response) => {
      const {
        recipient_name,
        phone,
        address,
        otp,
        status = "PENDING",
      } = request.body;

      const query = `
      INSERT INTO deliveries (recipient_name, phone, address, otp, status, timestamp)
      VALUES 
      ('${recipient_name}', 
      '${phone}', 
      '${address}', 
      '${otp}', 
      '${status}', 
      datetime('now'));`;

      const dbResponse = await db.run(query);
      const deliveryId = dbResponse.lastId;
      response.send({ deliveryId: deliveryId });
    });

    app.get("/", async (request, response) => {
      response.send("This is deliveries home");
    });

    app.listen(3000, () => {
      console.log("server running at http://localhost:3000/");
    });
  } catch (err) {
    console.log(`Error:${err.message}`);
    process.exit();
  }
};

initializeDBAndServer();
