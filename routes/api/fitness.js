const router = require("express").Router();
const fitnessController = require("../../controllers/fitnessController");


router.route("/")
.post(fitnessController.create);
//to store data then immediately redirect to /fitness/id/date

// Matches with "/api/books/:id"
router
 .route("/:id/:date")
  .get(fitnessController.findData)
  .put(fitnessController.update)
  .post(fitnessController.create)
  .delete(fitnessController.remove);

module.exports = router;
