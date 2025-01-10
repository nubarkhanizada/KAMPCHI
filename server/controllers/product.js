const db = require("../config/db");

// service for creating product
const createProduct = async (req, res) => {
  const { title, shortDescription, longDescription, price, productCode, image, isRented, rentalPrice, categoryID, userID } = req.body;

  if (!title || !shortDescription || !price || !productCode || !image || !isRented || !categoryID || !userID) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (isRented === '1' && !rentalPrice) {
    return res.status(400).json({ message: 'Rental price is required when product is rented' });
  }

  try {
    const data = await db.query(
      "INSERT INTO products (title, shortDescription, longDescription, price, rentalPrice, productCode, isRented, image, categoryID, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, shortDescription, longDescription || null, price, rentalPrice || null, productCode, isRented, image, categoryID, userID]
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch all products
const getProducts = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT products.productId, products.title, products.shortDescription, longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, productcategories.id AS categoryId, productcategories.name FROM products JOIN productcategories ON products.categoryID = productcategories.id"
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch recent products
const getRecentProducts = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT products.productId, products.title, products.shortDescription, products.longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, productcategories.id AS categoryId, productcategories.name FROM products JOIN productcategories ON products.categoryID = productcategories.id ORDER BY products.createdAt DESC"
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch product by id
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `SELECT products.productId, products.title, products.shortDescription, longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, productcategories.id AS categoryId, productcategories.name, users.id AS userId, users.username, users.fullname FROM products JOIN productcategories ON products.categoryID = productcategories.id JOIN users ON products.userID = users.id WHERE products.productId = ${id}`
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch all products by categoryID
const getProductsByCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `SELECT products.productId, products.title, products.shortDescription, products.longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, productcategories.id AS categoryId, productcategories.name FROM products JOIN productcategories ON products.categoryID = productcategories.id WHERE products.categoryID = ${id}`
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch all products by userID
const getProductsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(`SELECT products.productId, products.title, products.shortDescription, products.longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, users.id AS userId, users.fullname, users.username FROM products JOIN users ON products.userID = users.id WHERE products.userID = ${id} ORDER BY products.createdAt DESC`);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for search products
const searchProductsByName = async (req, res) => {
  const { title } = req.query;
  try {
    const data = await db.query(
      `SELECT products.productId, products.title, products.shortDescription, products.longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, productcategories.id AS categoryId, productcategories.name FROM products JOIN productcategories ON products.categoryID = productcategories.id
      WHERE title LIKE ? ORDER BY 
        CASE
          WHEN title LIKE ? THEN 1
          ELSE 2
        END, title`,
     [`%${title}%`, `${title}%`]
    );
    
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for filter products
const filterProducts = async (req, res) => {
  const { id, value } = req.query;
  let query = `SELECT products.productId, products.title, products.shortDescription, products.longDescription, products.price, products.rentalPrice, products.productCode, products.isStocked, products.isRented, products.image, productcategories.id AS categoryId, productcategories.name FROM products JOIN productcategories ON products.categoryID = productcategories.id WHERE products.categoryID = ?`;
  let params = [id];

  switch (value) {
    case "1":
      query += " ORDER BY products.title ASC";
      break;
    case "2":
      query += " ORDER BY products.title DESC";
      break;
    case "3":
      query += " ORDER BY products.price ASC";
      break;
    case "4":
      query += " ORDER BY products.price DESC";
      break;
    case "5":
      query += " ORDER BY products.createdAt DESC";
      break;
  }

  try {
    const data = await db.query(query, params);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for updating product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, shortDescription, longDescription, price, productCode, image, isRented, isStocked, rentalPrice, categoryID } = req.body;

  // Controls
  if (!title || !shortDescription || !price || !productCode || !image || !isRented || !isStocked || !categoryID) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (isRented === '1' && !rentalPrice) {
    return res.status(400).json({ message: 'Rental price is required when product is rented' });
  }

  try {
    // Updating
    const data = await db.query(
      "UPDATE products SET title = ?, shortDescription = ?, longDescription = ?, price = ?, rentalPrice = ?, productCode = ?, isRented = ?, isStocked = ?, image = ?, categoryID = ? WHERE productId = ?",
      [title, shortDescription, longDescription || null, price, rentalPrice || 0.00, productCode, isRented, isStocked, image, categoryID, id]
    );

    if (data.affectedRows === 0) {
      return res.status(404).json("No data found...");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(`DELETE FROM products WHERE productId=${id}`);
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createProduct, getProductById, getProducts, getRecentProducts, searchProductsByName, getProductsByCategoryId, getProductsByUserId, filterProducts, updateProduct, deleteProduct};
