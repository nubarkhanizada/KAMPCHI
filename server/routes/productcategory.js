const router = require("express").Router();
const { createProductCategory, getProductCategories, getSpecificProductCategories, updateProductCategory, deleteProductCategory } = require("../controllers/productcategory");

router.post("/create", createProductCategory);

router.get("/all", getProductCategories);

router.get("/specific", getSpecificProductCategories);

router.put("/:id", updateProductCategory);

router.delete("/:id", deleteProductCategory);

module.exports = router;
