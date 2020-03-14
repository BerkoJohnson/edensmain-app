const express = require("express");
const router = express.Router();
const electionsCtrl = require("../controllers/elections");

router
  .route("/")
  .post(electionsCtrl.createElection)
  .get(electionsCtrl.fetchElections);

router
  .route("/:id")
  .get(electionsCtrl.fetchElection)
  .put(electionsCtrl.updateElection)
  .delete(electionsCtrl.deleteElection);

module.exports = router;
