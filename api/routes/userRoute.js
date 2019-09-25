const router = require("express").Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/signup", userController.register);
router.get("/", authenticate, userController.getAllUser);

module.exports = router;
