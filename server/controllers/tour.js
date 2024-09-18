const db = require("../config/db");

// service for creating tour
const createTour = async (req, res) => {
  const {title, shortDescription, longDescription, price, startDate, endDate, startTime, endTime, country, city, image, categoryID, userID,} = req.body;

  if (!title || !shortDescription || !price || !startDate || !startTime || !country || !city || !image || !categoryID || !userID) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const data = await db.query(
      "INSERT INTO tours (title, shortDescription, longDescription, price, startDate, endDate, startTime, endTime, country, city, image, categoryID, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, shortDescription, longDescription || null, price, startDate, endDate || null, startTime, endTime || null, country, city, image, categoryID, userID,]);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch all tours
const getTours = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id ORDER BY tours.createdAt DESC"
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch recent tours
const getRecentTours = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id ORDER BY tours.tourId DESC LIMIT 9"
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch tour by id
const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id WHERE tours.tourId = ${id}`
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch all tours by categoryID
const getToursByCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id WHERE tours.categoryID = ${id} ORDER BY tours.createdAt DESC`
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for fetch all tours by userID
const getToursByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id WHERE tours.userID = ${id} ORDER BY tours.createdAt DESC`
    );
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for search tours
const searchToursByName = async (req, res) => {
  const { title } = req.query;
  try {
    const data = await db.query(
      `SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id
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

// service for filter tours
const filterTours = async (req, res) => {
  const { id, value } = req.query;
  let query = `SELECT tours.tourId, tours.title, tours.country, tours.city, tours.price, tours.isStocked, tours.shortDescription, tours.longDescription, tours.startDate, tours.startTime, tours.endDate, tours.endTime, tours.image AS tourImage, tourcategories.id AS categoryId, tourcategories.name, tourcategories.description AS categoryDescription, tourcategories.image AS categoryImage, users.id AS userId, users.fullname, users.roleID AS roleId FROM tours JOIN tourcategories ON tours.categoryID = tourcategories.id JOIN users ON tours.userID = users.id WHERE tours.categoryID = ?`;
  let params = [id];

  switch (value) {
    case "1":
      query += " ORDER BY tours.title ASC";
      break;
    case "2":
      query += " ORDER BY tours.title DESC";
      break;
    case "3":
      query += " ORDER BY tours.price ASC";
      break;
    case "4":
      query += " ORDER BY tours.price DESC";
      break;
    case "5":
      query += " ORDER BY tours.startDate ASC";
      break;
    case "6":
      query += " ORDER BY tours.startDate DESC";
      break;
  }

  try {
    const data = await db.query(query, params);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for updating tour
const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, shortDescription, longDescription, price, startDate, endDate, startTime, endTime, country, city, image, isStocked, categoryID, userID, } = req.body;

  // Controls
  if ( !title || !shortDescription || !price || !startDate || !startTime || !country || !city || !image || !isStocked || !categoryID ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Updating
    const data = await db.query(
      "UPDATE tours SET title = ?, shortDescription = ?, longDescription = ?, price = ?, startDate = ?, endDate = ?, startTime = ?, endTime = ?, country = ?, city = ?, image = ?, isStocked = ?, categoryID = ? WHERE tourId = ?",
      [ title, shortDescription, longDescription || null, price, startDate, endDate || null, startTime, endTime || null, country, city, image, isStocked, categoryID, id, ]
    );

    if (data.affectedRows === 0) {
      return res.status(404).json("No data found...");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for delete tour
const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(`DELETE FROM tours WHERE tourId=${id}`);
    if (!data) {
      res.status(404).json("No data found...");
    }
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createTour, getTourById, getTours, getRecentTours, searchToursByName, getToursByCategoryId, getToursByUserId, filterTours, updateTour, deleteTour };
