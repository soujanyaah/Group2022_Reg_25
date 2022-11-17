const express = require("express");
const {
  login,
  addUser,
  signUp,
  saveMessage,
} = require("../controllers/user-controller");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { fileUpload } = require("../controllers/file-upload-controller");

const adminAuth = require("../middleware/AdminAuthentication");
const Authentication = require("../middleware/Authentication");
const managerAuth = require("../middleware/ManagerAuthentication");
const router = express.Router();

router.post("/login", login);
router.post("/signup", adminAuth, signUp); //admin register
router.put("/save", Authentication, saveMessage);
router.post("/upload", upload.single("file"), managerAuth, fileUpload);

module.exports = router;
