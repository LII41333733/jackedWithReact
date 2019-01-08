const router = require("express").Router();
const fitnessRoutes = require("./fitness");

// Book routes
router.use("/fitness", fitnessRoutes);

module.exports = router;
