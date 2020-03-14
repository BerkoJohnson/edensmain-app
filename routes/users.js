const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

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
  .post(userCtrl.createUser)
  .get(userCtrl.fetchUsers);

router.route("/resetpassword").put(userCtrl.resetPassword);
router.route("/login").post(userCtrl.login);
router.post(
  "/:id/setuserphoto",
  upload.single("user"),
  userCtrl.updatePhoto
);

router.get(
  "/:id/userphoto",
  userCtrl.fetchImage
);

router
  .route("/:id")
  .get(userCtrl.fetchUser)
  .put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
