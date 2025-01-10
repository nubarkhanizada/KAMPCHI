const db = require("../config/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv/config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const usernamePattern = /^[a-zA-Z0-9_.]+$/;

// function for email checking
const checkEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return result[0].length > 0;
};

// function for username checking
const checkUsername = async (username) => {
  const result = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
  return result[0].length > 0;
};

// service for registering a new customer
const registerCustomer = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    // Email checking
    const emailExists = await checkEmail(email);
    if (emailExists) {
      return res.status(409).json("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const response = await db.query(`INSERT INTO users (fullname, email, password) VALUES(?,?,?)`, [fullname, email, hashedPassword]);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for registering a new seller
const registerSeller = async (req, res) => {
  const { fullname, username, email, password } = req.body;
    
  try {
    // Email checking
    const emailExists = await checkEmail(email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // Username checking
    const usernameExists = await checkUsername(username);
    if (usernameExists) {
      return res.status(409).json({ error: "Username already taken." });
    }

    // Check if the username contains only allowed characters
    if (!usernamePattern.test(username)) {
      return res.status(400).json({
        error: "Username can only contain letters, numbers, underscores, and periods, and cannot contain spaces.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const roleID = 3;
    const response = await db.query(`INSERT INTO users (fullname, username, email, password, roleID) VALUES (?, ?, ?, ?, ?)`, [fullname, username, email, hashedPassword, roleID]);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for registering a new guide
const registerGuide = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    // Email checking
    const emailExists = await checkEmail(email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // Username checking
    const usernameExists = await checkUsername(username);
    if (usernameExists) {
      return res.status(409).json({ error: "Username already taken." });
    }

    // Check if the username contains only allowed characters
    if (!usernamePattern.test(username)) {
      return res.status(400).json({
        error: "Username can only contain letters, numbers, underscores, and periods, and cannot contain spaces.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const roleID = 2;
    const response = await db.query(`INSERT INTO users (fullname, username, email, password, roleID) VALUES (?, ?, ?, ?, ?)`, [fullname, username, email, hashedPassword, roleID]);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// service for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query(`SELECT u.*, r.name AS roleName, r.id AS roleId FROM users u JOIN roles r ON u.roleID = r.id WHERE u.email = ?`, [email]);
    if (result[0].length === 0) {
      return res.status(404).json("User not found...");
    }
    const user = result[0][0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json("Incorrect password");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        fullname: user.fullname,
        username: user.username,
        userRoleId: user.roleId,
        userRole: user.roleName,
      },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

// service for user checking
const checkLogin = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).json("Token not found...");
  }

  jwt.verify(token, process.env.JWT_KEY, (error, user) => {
    if (error) {
      res.status(403);
    }
    res.json(user);
  });
};

module.exports = { registerCustomer, registerSeller, registerGuide, registerGuide, loginUser, checkLogin };