const { Router } = require("express");
const controller = require("../controllers/controller");
const verifyToken = require("../middleware/auth");

const router = Router();

router.get("/", controller.getHomepage);
router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", controller.postSignUp);
// router.post("log-in", controller.postLogIn);
router.post("/log-in", controller.postLogIn);
router.get("/posts", verifyToken, controller.getPosts);

module.exports = router;
