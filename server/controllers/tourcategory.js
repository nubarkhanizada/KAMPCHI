const db = require("../config/db");

// service for create tour category
const createTourCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await db.query(`INSERT INTO tourcategories(name) values(?)`, [
      name,
    ]);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for fetch all tour categories
const getTourCategories = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM tourcategories ORDER BY id ASC`);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for fetch specific tour categories
const getSpecificTourCategories = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT * FROM tourcategories WHERE id IN (1, 2, 3, 4, 5, 6, 8, 11) ORDER BY id ASC`
    );
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for update product category
const updateTourCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  try {
    const updatedData = await db.query(
      `UPDATE tourcategories SET name=?, description=?, image=? WHERE id=?`,
      [name, description, image, id]
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// service for delete product category
const deleteTourCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(`DELETE FROM tourcategories WHERE id=${id}`);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createTourCategory, getTourCategories, updateTourCategory, deleteTourCategory, getSpecificTourCategories };
