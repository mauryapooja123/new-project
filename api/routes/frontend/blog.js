const express = require("express");
const router = express.Router();

const blogController = require("../../controllers/frontend/blog");

router.get("/getAll", blogController.getAll);
router.get("/get/:pageNo/:limit", blogController.getBlog);
// router.get("/byId/:id", upload.array("blogImg", 1), blogController.getById);
router.get("/getByCategoryId/:id/:pageNo/:limit", blogController.getBlogByCategoryId);
router.get("/getById/:id", blogController.getBlogById);

// router.get("/search/:pageNo/:limit/:searchValue", blogController.BlogSearch);

module.exports = router;
