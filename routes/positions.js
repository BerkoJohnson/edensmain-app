const express = require("express");
const router = express.Router();
const positionCtrl = require("../controllers/positions");

router
  .route("/")
  .post(positionCtrl.createPosition)
  .get(positionCtrl.fetchPositions);

router
  .route("/:id")
  .get(positionCtrl.fetchPosition)
  .put(positionCtrl.updatePosition)
  .delete(positionCtrl.deletePosition);

module.exports = router;
