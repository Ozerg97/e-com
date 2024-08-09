const express = require("express");
const app = express(); // create express app

const dotenv = require("dotenv");
dotenv.config();
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User1");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

const PORT = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");



// connect to db
mongoose
  .connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("DB connected"))
  .then((err) => console.log(err));

app.use(express.json()); 


app.use(cors());

//database seeder routes
app.use("/api/seed", databaseSeeder);


// routes for users
app.use("/api/users", userRoute);

// routes for products
app.use("/api/products", productRoute);

// routes for products
app.use("/api/orders", orderRoute);

// paypal payment route
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID );
});

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});

//test route 
// app.get('/api/products', (req, res) => {
//     res.json(products);
//     }
// );

//http://localhost:3000/api/products/1
// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((product) => product.id == req.params.id);
//     res.json(product);
//     });
