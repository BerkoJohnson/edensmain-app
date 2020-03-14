const express = require("express");
const router = express.Router();
const studentsCtrl = require("../controllers/students");

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
  .post(studentsCtrl.createStudent)
  .get(studentsCtrl.fetchStudents);

router.route("/resetpassword").put(studentsCtrl.resetPassword);
router.route("/login").post(studentsCtrl.login);
router.post("/:id/setuserphoto", upload.single("student"), studentsCtrl.updatePhoto);

router
  .route("/:id")
  .get(studentsCtrl.fetchStudent)
  .put(studentsCtrl.updateStudent)
  .delete(studentsCtrl.deleteStudent);

module.exports = router;
