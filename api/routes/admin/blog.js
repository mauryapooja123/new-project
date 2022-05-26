const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const DIR = "./uploads/Blog";
const blogController = require("../../controllers/admin/blog");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
    // console.log(DIR, "in the dir");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

router.post("/create", upload.array("blogImg", 1), blogController.createBlog);
// router.get("/getAll", blogController.getAll);
router.get("/getAll/:_id/:pageNo/:limit", blogController.getAllCategory);
router.get("/get/:pageNo/:limit", blogController.getBlog);
router.get("/byId/:id", upload.array("blogImg", 1), blogController.getById);
router.get("/getById/:id", blogController.getBlogById);
router.put("/edit/:id", upload.array("blogImg", 1), blogController.blogEdit);
router.delete("/remove/:id", blogController.BlogDelete);
router.get("/search/:pageNo/:limit/:searchValue", blogController.BlogSearch);

module.exports = router;
