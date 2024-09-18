const router = require("express").Router();
const { createTourCategory, getTourCategories, getSpecificTourCategories, updateTourCategory, deleteTourCategory,
} = require("../controllers/tourcategory");

router.post("/create", createTourCategory);

router.get("/all", getTourCategories);

router.get("/specific", getSpecificTourCategories);

router.put("/:id", updateTourCategory);

router.delete("/:id", deleteTourCategory);

module.exports = router;
