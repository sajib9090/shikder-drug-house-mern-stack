const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");

require("dotenv").config();
app.use(express.json());

//MIDDLE WARE
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// mongoDB

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const productsCollection = client.db("shikderDB").collection("products");
    const countryCollection = client.db("shikderDB").collection("country");
    const genericCollection = client.db("shikderDB").collection("generic");
    const cartCollection = client.db("shikderDB").collection("carts");
    const manufacturerCollection = client
      .db("shikderDB")
      .collection("manufacturer");
    const dosageFormCollection = client
      .db("shikderDB")
      .collection("dosageForm");

    //---------------------------------------------
    // post api for jwt
    app.post("/jwt", async (req, res) => {
      const body = req.body;

      const token = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    });
    // post, patch and get api for generic
    app.get("/get/generic/:text", async (req, res) => {
      const result = await genericCollection
        .find(
          {
            generic: { $regex: req.params.text },
            status: "approved",
          },
          {
            projection: { generic: 1 },
          }
        )
        .toArray();
      res.send(result);
    });
    // get api for all generic
    app.get("/all/generic", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 30;
      const skip = (page - 1) * perPage;

      try {
        const totalCount = await genericCollection.countDocuments();
        const result = await genericCollection
          .find()
          .sort({ generic: 1 })
          .skip(skip)
          .limit(perPage)
          .toArray();

        const totalPages = Math.ceil(totalCount / perPage);

        res.send({
          currentPage: page,
          totalPages: totalPages,
          perPage: perPage,
          totalGeneric: totalCount,
          generic: result,
        });
      } catch (error) {
        console.error("Error fetching generics:", error);
        res.status(500).send("Error fetching generics");
      }
    });
    //post api for generic
    app.post("/add/generic", async (req, res) => {
      const generic = req.body;
      // console.log(generic);
      const userTimezone = "Asia/Dhaka";
      generic.createdAt = moment().tz(userTimezone).toDate();

      // Ensure that the name field is in lowercase
      if (generic.generic && typeof generic.generic === "string") {
        generic.generic = generic.generic.toLowerCase();
      }
      const query = {
        generic: generic.generic,
      };
      const existingGeneric = await genericCollection.findOne(query);
      if (existingGeneric) {
        return res.send({ message: "generic already exist" });
      }
      generic.status = "pending";
      const result = await genericCollection.insertOne(generic);
      res.send(result);
    });
    //patch api
    app.patch("/genericUpdateById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const updateData = {
        status: req.body.status,
        lastGenericUpdated: new Date(),
      };
      try {
        // Assuming usersCollection is a reference to your MongoDB collection
        const result = await genericCollection.updateOne(query, {
          $set: updateData,
        });

        if (result.matchedCount === 0) {
          res.status(404).send("Generic not found.");
        } else {
          res.send("Generic updated successfully.");
        }
      } catch (error) {
        console.error("Error updating Generic:", error);
        res.status(500).send("Error updating Generic.");
      }
    });
    //---------------------------------------------
    //---------------------------------------------
    // post and get api for manufacturer
    app.get("/get/manufacturer/:text", async (req, res) => {
      const result = await manufacturerCollection
        .find(
          {
            manufacturer: { $regex: req.params.text },
            status: "approved",
          },
          {
            projection: { manufacturer: 1 },
          }
        )
        .toArray();
      res.send(result);
    });
    // get api for all manufacturer
    app.get("/all/manufacturer", verifyJWT, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 30;
      const skip = (page - 1) * perPage;

      try {
        const totalCount = await manufacturerCollection.countDocuments();
        const result = await manufacturerCollection
          .find()
          .sort({ manufacturer: 1 })
          .skip(skip)
          .limit(perPage)
          .toArray();

        const totalPages = Math.ceil(totalCount / perPage);

        res.send({
          currentPage: page,
          totalPages: totalPages,
          perPage: perPage,
          totalGeneric: totalCount,
          manufacturer: result,
        });
      } catch (error) {
        console.error("Error fetching manufacturer:", error);
        res.status(500).send("Error fetching manufacturer");
      }
    });
    app.post("/add/manufacturer", async (req, res) => {
      const manufacturer = req.body;
      const userTimezone = "Asia/Dhaka";
      manufacturer.createdAt = moment().tz(userTimezone).toDate();

      // Ensure that the name field is in lowercase
      if (
        manufacturer.manufacturer &&
        typeof manufacturer.manufacturer === "string"
      ) {
        manufacturer.manufacturer = manufacturer.manufacturer.toLowerCase();
      }
      const query = {
        manufacturer: manufacturer.manufacturer,
      };
      const existingManufacturer = await manufacturerCollection.findOne(query);
      if (existingManufacturer) {
        return res.send({ message: "manufacturer already exist" });
      }
      manufacturer.status = "pending";
      const result = await manufacturerCollection.insertOne(manufacturer);
      res.send(result);
    });
    //patch api
    app.patch("/manufacturerUpdateById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const updateData = {
        status: req.body.status,
        lastManufacturerUpdated: new Date(),
      };
      try {
        // Assuming usersCollection is a reference to your MongoDB collection
        const result = await manufacturerCollection.updateOne(query, {
          $set: updateData,
        });

        if (result.matchedCount === 0) {
          res.status(404).send("Manufacturer not found.");
        } else {
          res.send("Manufacturer updated successfully.");
        }
      } catch (error) {
        console.error("Error updating Manufacturer:", error);
        res.status(500).send("Error updating Manufacturer.");
      }
    });
    //---------------------------------------------

    //---------------------------------------------
    // post and get api for dosageForm
    // get by search value api for dosageForm
    app.get("/get/dosageForm/:text", async (req, res) => {
      const result = await dosageFormCollection
        .find(
          {
            dosageForm: { $regex: req.params.text },
            status: "approved",
          },
          {
            projection: { dosageForm: 1 },
          }
        )
        .toArray();
      res.send(result);
    });
    // get api for all dosageForm
    app.get("/all/dosageForm", verifyJWT, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 30;
      const skip = (page - 1) * perPage;

      try {
        const totalCount = await dosageFormCollection.countDocuments();
        const result = await dosageFormCollection
          .find()
          .sort({ dosageForm: 1 })
          .skip(skip)
          .limit(perPage)
          .toArray();

        const totalPages = Math.ceil(totalCount / perPage);

        res.send({
          currentPage: page,
          totalPages: totalPages,
          perPage: perPage,
          totalGeneric: totalCount,
          dosageForm: result,
        });
      } catch (error) {
        console.error("Error fetching dosageForm:", error);
        res.status(500).send("Error fetching dosageForm");
      }
    });
    app.post("/add/dosageForm", async (req, res) => {
      const dosageForm = req.body;
      const userTimezone = "Asia/Dhaka";
      dosageForm.createdAt = moment().tz(userTimezone).toDate();

      // Ensure that the name field is in lowercase
      if (dosageForm.dosageForm && typeof dosageForm.dosageForm === "string") {
        dosageForm.dosageForm = dosageForm.dosageForm.toLowerCase();
      }
      const query = {
        dosageForm: dosageForm.dosageForm,
      };
      const existingDosageForm = await dosageFormCollection.findOne(query);
      if (existingDosageForm) {
        return res.send({ message: "Dosage Form already exist" });
      }
      dosageForm.status = "pending";
      const result = await dosageFormCollection.insertOne(dosageForm);
      res.send(result);
    });
    //patch api
    app.patch("/dosageFormUpdateById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const updateData = {
        status: req.body.status,
        lastDosageFormUpdated: new Date(),
      };
      try {
        // Assuming usersCollection is a reference to your MongoDB collection
        const result = await dosageFormCollection.updateOne(query, {
          $set: updateData,
        });

        if (result.matchedCount === 0) {
          res.status(404).send("Dosage Form not found.");
        } else {
          res.send("Dosage Form updated successfully.");
        }
      } catch (error) {
        console.error("Error updating Dosage Form:", error);
        res.status(500).send("Error updating Dosage Form.");
      }
    });
    //--------------------------------------------
    // get api
    // all country
    app.get("/country", async (req, res) => {
      const result = await countryCollection.find().toArray();
      res.send(result);
    });
    // older first api
    app.get("/all/users", verifyJWT, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 15;
      const skip = (page - 1) * perPage;

      try {
        const totalCount = await usersCollection.countDocuments();
        const result = await usersCollection
          .find()
          .sort({ createdAt: 1 })
          .skip(skip)
          .limit(perPage)
          .toArray();

        const totalPages = Math.ceil(totalCount / perPage);

        res.send({
          currentPage: page,
          totalPages: totalPages,
          perPage: perPage,
          totalUsers: totalCount,
          users: result,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
      }
    });

    // filter by latest first api
    app.get("/all/users/latest", verifyJWT, async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 15;
      const skip = (page - 1) * perPage;

      try {
        const totalCount = await usersCollection.countDocuments();
        const result = await usersCollection
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(perPage)
          .toArray();

        const totalPages = Math.ceil(totalCount / perPage);

        res.send({
          currentPage: page,
          totalPages: totalPages,
          perPage: perPage,
          totalUsers: totalCount,
          users: result,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
      }
    });

    //users get by id
    app.get("/userGetById/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const data = await usersCollection.findOne(query);
      res.send(data);
    });
    // users get by email
    //for normal fetch by email
    app.get("/usersGetByEmail/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // for editing
    app.get("/users/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== req.params.email) {
        return res.status(403).send({ error: "Forbidden Access" });
      }
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // post api

    app.post("/add/users", async (req, res) => {
      const user = req.body;
      const userTimezone = "Asia/Dhaka";

      user.createdAt = moment().tz(userTimezone).toDate();
      user.role_createdAt = moment().tz(userTimezone).toDate();
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exist" });
      }

      // Set default values for user role customer
      user.role = "customer";

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // user role updated by searching id api
    app.patch("/userUpdateById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const updateData = {
        role: req.body.role,
        lastRoleUpdated: new Date(),
      };
      try {
        // Assuming usersCollection is a reference to your MongoDB collection
        const result = await usersCollection.updateOne(query, {
          $set: updateData,
        });

        if (result.matchedCount === 0) {
          res.status(404).send("User not found.");
        } else {
          res.send("User updated successfully.");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user.");
      }
    });
    //put
    // todo this will need change put to patch
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          image: user.image,
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
    //seller request api
    app.put("/seller/request/:email", async (req, res) => {
      const email = req.params.email;

      const filter = { email: email };
      const options = { upsert: true };
      const data = req.body;

      const userTimezone = "Asia/Dhaka";

      data.sellerRequestDate = moment().tz(userTimezone).toDate();

      const sellerInformation = {
        $set: data,
      };
      try {
        const result = await usersCollection.updateOne(
          filter,
          sellerInformation,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send("Error updating user information.");
      }
    });
    // seller approved
    app.put("/seller/request/maintain/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const data = req.body;

      const userTimezone = "Asia/Dhaka";

      data.sellerRequestApprovedDate = moment().tz(userTimezone).toDate();

      const sellerInformation = {
        $set: data,
      };
      try {
        const result = await usersCollection.updateOne(
          filter,
          sellerInformation,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send("Error updating user information.");
      }
    });

    // product related api
    // get api for product
    app.get("/product/:id", async (req, res) => {
      const productId = req.params.id;
      try {
        const product = await productsCollection.findOne({
          _id: new ObjectId(productId),
        });

        if (!product) {
          return res.status(404).send({ error: "Product not found." });
        }

        res.send(product);
      } catch (err) {
        res
          .status(500)
          .send({ error: "An error occurred while fetching data." });
      }
    });
    app.get("/all/products", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 20;
      const skip = (page - 1) * perPage;

      const sortOrder = -1; // -1 for descending (latest order first) or 1 for ascending (oldest order first)

      try {
        const result = await productsCollection
          .find({ isBanned: { $ne: true } })
          .sort({ _id: sortOrder })
          .skip(skip)
          .limit(perPage)
          .toArray();

        res.send(result);
      } catch (err) {
        res
          .status(500)
          .send({ error: "An error occurred while fetching data." });
      }
    });

    // get product by search
    app.get("/product/getBySearch/:medicine_name", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const perPage = 30;
      const skip = (page - 1) * perPage;

      const sortOrder = -1;
      const searchQuery = req.params.medicine_name
        ? {
            medicine_name: {
              $regex: new RegExp(req.params.medicine_name, "i"),
            },
          }
        : { isBanned: { $ne: true } };

      try {
        const result = await productsCollection
          .find(searchQuery)
          .sort({ _id: sortOrder })
          .skip(skip)
          .limit(perPage)
          .toArray();

        res.send(result);
      } catch (err) {
        res
          .status(500)
          .send({ error: "An error occurred while fetching data." });
      }
    });
    // post api for product
    app.post("/add/product", async (req, res) => {
      const product = req.body;
      const productTimezone = "Asia/Dhaka";
      product.createdAt = moment().tz(productTimezone).toDate();
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });
    //put
    app.put("/product/category/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const data = req.body;

      const modifyCategory = {
        $set: data,
      };
      try {
        const result = await productsCollection.updateOne(
          filter,
          modifyCategory,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send("Error updating user information.");
      }
    });

    app.put("/product/views/:id", async (req, res) => {
      const productId = req.params.id;
      const newView = req.body.value;

      try {
        const product = await productsCollection.findOne({
          _id: new ObjectId(productId),
        });

        if (!product) {
          return res.status(404).send({ error: "Product not found." });
        }

        // Initialize views to 0 if not present
        const currentViews = product.views || 0;

        const updatedValue = currentViews + newView;
        await productsCollection.updateOne(
          { _id: new ObjectId(productId) },
          { $set: { views: updatedValue } }
        );

        res.send({ message: "Value updated successfully." });
      } catch (err) {
        res
          .status(500)
          .send({ error: "An error occurred while updating the value." });
      }
    });

    // cart related api
    // get api for cart

    app.get("/carts", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const page = parseInt(req.query.page) || 1;
      const perPage = 20;
      const skip = (page - 1) * perPage;

      const query = { buyer_email: email };
      const result = await cartCollection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .toArray();

      res.send(result);
    });
    // post api for cart
    // app.post("/add/cart", async (req, res) => {
    //   const cart = req.body;
    //   const cartTimezone = "Asia/Dhaka";
    //   cart.createdAt = moment().tz(cartTimezone).toDate();

    //   try {
    //     // Check if the product with the same name and buyer_email already exists in the cart
    //     const existingProduct = await cartCollection.findOne({
    //       product_name: cart.product_name,
    //       buyer_email: cart.buyer_email,
    //     });

    //     if (existingProduct) {
    //       // Calculate the total quantity after adding the product_quantity to the existing quantity
    //       const newTotalQuantity =
    //         existingProduct.product_quantity + cart.product_quantity;

    //       // Check if the new total quantity exceeds the product_available_quantity
    //       if (newTotalQuantity > existingProduct.product_available_quantity) {
    //         return res.status(400).send({
    //           error:
    //             "Insufficient quantity. Quantity exceeds available quantity.",
    //         });
    //       }

    //       // If the new total quantity is within the available quantity limit, update the product_quantity and total_price
    //       cart.product_quantity = newTotalQuantity;
    //       cart.total_price =
    //         cart.product_quantity * cart.product_price_per_unit;

    //       // Update the existing cart
    //       await cartCollection.updateOne(
    //         { product_name: cart.product_name, buyer_email: cart.buyer_email },
    //         {
    //           $set: {
    //             product_quantity: cart.product_quantity,
    //             total_price: cart.total_price,
    //           },
    //         }
    //       );

    //       return res.send({ message: "Product quantity updated in the cart." });
    //     } else {
    //       // If the product doesn't exist in the cart, calculate the total price based on the product quantity and price
    //       cart.total_price =
    //         cart.product_quantity * cart.product_price_per_unit;

    //       // Add the new product to the cart
    //       const result = await cartCollection.insertOne(cart);
    //       return res.send(result);
    //     }
    //   } catch (err) {
    //     res.status(500).send({
    //       error: "An error occurred while adding the product to the cart.",
    //     });
    //   }
    // });
    app.post("/add/cart", async (req, res) => {
      const cart = req.body;
      const cartTimezone = "Asia/Dhaka";
      cart.createdAt = moment().tz(cartTimezone).toDate();

      try {
        // Check if the product with the same name and buyer_email already exists in the cart
        const existingProduct = await cartCollection.findOne({
          product_name: cart.product_name,
          buyer_email: cart.buyer_email,
        });

        if (existingProduct) {
          // Calculate the total quantity after adding the product_quantity to the existing quantity
          const newTotalQuantity =
            existingProduct.product_quantity + cart.product_quantity;

          // Check if the new total quantity exceeds the product_available_quantity
          if (newTotalQuantity > existingProduct.product_available_quantity) {
            return res.status(400).send({
              error:
                "Insufficient quantity. Quantity exceeds available quantity.",
            });
          }

          // If the new total quantity is within the available quantity limit, update the product_quantity
          cart.product_quantity = newTotalQuantity;

          // Update the existing cart
          await cartCollection.updateOne(
            { product_name: cart.product_name, buyer_email: cart.buyer_email },
            { $set: { product_quantity: cart.product_quantity } }
          );

          return res.send({ message: "Product quantity updated in the cart." });
        } else {
          // If the product doesn't exist in the cart, add the new product to the cart
          const result = await cartCollection.insertOne(cart);
          return res.send(result);
        }
      } catch (err) {
        res.status(500).send({
          error: "An error occurred while adding the product to the cart.",
        });
      }
    });

    // patch api for update
    app.patch("/carts/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateData = {
        product_quantity: req.body.product_quantity,
      };
      try {
        // Assuming usersCollection is a reference to your MongoDB collection
        const result = await cartCollection.updateOne(query, {
          $set: updateData,
        });

        if (result.matchedCount === 0) {
          res.status(404).send("Cart not found.");
        } else {
          res.send("Cart updated successfully.");
        }
      } catch (error) {
        res.status(500).send("Error updating Cart.");
      }
    });
    // delete api for cart
    app.delete("/cartItemDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
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
