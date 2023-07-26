const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//MIDDLE WARE
app.use(cors());
app.use(express.json());

// mongoDB

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// middleware function for jwt
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).send({ error: "Unauthorized Access" });
  }

  //step-2
  const token = authorization.split(" ")[1];
  // console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const usersCollection = client.db("shikderDB").collection("users");

    // get api
    app.get("/all/users", verifyJWT, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // users get by email
    app.get("/users/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== req.params.email) {
        return res.status(451).send({ error: "Unavailable For Legal Reasons" });
      }
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // post api for jwt
    app.post("/jwt", async (req, res) => {
      const body = req.body;
      0;
      const token = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // post api
    let lastSerialNumber = 0;
    app.post("/add/users", async (req, res) => {
      const user = req.body;
      const userTimezone = "Asia/Dhaka";
      // Generate the next sequential serial number
      lastSerialNumber++;
      user.serialNumber = lastSerialNumber;
      user.createdAt = moment().tz(userTimezone).toDate();
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exist" });
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    //put
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          profilePhoto: user.profilePhoto,
          lastUpdated: new Date(),
        },
      };

      const result = await usersCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Shiker server is running");
});
app.listen(port, () => {
  console.log(`Shikder server is running on port ${port}`);
});
