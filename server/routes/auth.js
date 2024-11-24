const router = require("express").Router();
const { registerCustomer, registerSeller, registerGuide, loginUser, checkLogin} = require("../controllers/auth");

router.post("/register", registerCustomer);

router.post("/register/seller", registerSeller);

router.post("/register/guide", registerGuide);

router.post("/login", loginUser);

router.get("/verify", checkLogin);

module.exports = router;
