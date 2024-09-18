const db = require("../config/db");

// service for create product category
const createProductCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await db.query(
      `INSERT INTO productcategories(name) values(?)`,
      [name]
    );
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for fetch all product categories
const getProductCategories = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT * FROM productcategories ORDER BY id ASC`
    );
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for fetch specific product categories
const getSpecificProductCategories = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT * FROM productcategories WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8) ORDER BY id ASC`
    );
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for update product category
const updateProductCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedData = await db.query(
      `UPDATE productcategories SET name=? WHERE id=?`,
      [name, id]
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for delete product category
const deleteProductCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(`DELETE FROM productcategories WHERE id=${id}`);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createProductCategory, getProductCategories, updateProductCategory, deleteProductCategory, getSpecificProductCategories };
