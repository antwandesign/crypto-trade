const router = require("express").Router();

//Home route
const homeController = require("../controllers/homeController");
router.use(homeController);

//Auth route
const authController = require("../controllers/authController");
router.use("/auth", authController);

//Crypto route
const cryptoController = require("../controllers/cryptoController");
router.use("/catalog", cryptoController);

//Search route
const searchController = require("../controllers/searchController");
router.use("/search", searchController);

module.exports = router;
