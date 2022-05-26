const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const DIR = "./uploads/Galary";
const galaryController = require("../../controllers/admin/galary.controller");

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

router.post("/create", upload.array("image", 1), galaryController.create);
router.post(
  "/createSimpleImage",
  upload.array("image", 1),
  galaryController.createSimpleImage
);

// // router.get("/getAll", blogController.getAll);
// router.get("/getAll/:_id/:pageNo/:limit", galaryController.getWithPagination);
router.get("/get/:pageNo/:limit", galaryController.getWithPagination);
// router.get("/byId/:id", upload.array("blogImg", 1), blogController.getById);
// router.get("/getById/:id", blogController.getBlogById);
// router.put("/edit/:id", upload.array("blogImg", 1), blogController.blogEdit);
// router.delete("/remove/:id", blogController.BlogDelete);
// router.get("/search/:pageNo/:limit/:searchValue", blogController.BlogSearch);

module.exports = router;
