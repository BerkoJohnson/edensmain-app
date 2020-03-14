const express = require("express");
const router = express.Router();
const candidateCtrl = require("../controllers/candidates");

const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
    files: 1
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Upload image file only"));
    }

    cb(undefined, true);
  }
});

router
  .route("/")
  .post(candidateCtrl.createCandidate)
  .get(candidateCtrl.fetchCandidates);

router.post("/:id/setuserphoto", upload.single("user"), candidateCtrl.updatePhoto);

router
  .route("/:id")
  .get(candidateCtrl.fetchCandidate)
  .put(candidateCtrl.updateCandidate)
  .delete(candidateCtrl.deleteCandidate);

module.exports = router;
