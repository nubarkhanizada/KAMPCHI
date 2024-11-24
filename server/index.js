const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const db = require("./config/db");
const productRoute = require("./routes/product");
const productCategoryRoute = require("./routes/productcategory");
const tourRoute = require("./routes/tour");
const tourCategoryRoute = require("./routes/tourcategory");
const userRoute = require("./routes/auth");

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/products/categories", productCategoryRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/tours/categories", tourCategoryRoute);
app.use("/api/v1/auth", userRoute);

// sql connection
db.query("SELECT 1")
  .then(() => {
    console.log("DB connection is successful");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed:", error);
  });