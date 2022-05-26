const galary = require("../../models/galary");
const galaryService = require("../../services/galary.service");
var mime = require("mime-types");
const fs = require("fs");
// // const { pick } = require("lodash");

const createSimpleImage = async (req, res) => {
  try {
    const { image, widthImage, heightImage } = req.body;
    const galaryObj = {
      widthImage: widthImage,
      heightImage: heightImage,
    };
    if (req.files[0].filename) {
      galaryObj.image = req.files[0].filename;
    }
    const createdGalary = await galaryService.post(galaryObj);
    return res.status(201).json({
      success: true,
      message: "Image added succesfully",
      data: createdGalary,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

// const create = async (req, res, next) => {
//   const { image, heightimage, widthimage } = req.body;
//   var matches = req.body.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
//     response = {};
//   console.log(matches, "jjjjjjjjjjj");

//   console.log(response, "jjjjjjjdddjjjj");

//   if (matches.length !== 3) {
//     return new Error("Invalid input string");
//   }

//   response.type = matches[1];
//   console.log(response.type, "hhhhhhhhh");
//   response.data = new Buffer(matches[2], "base64");
//   console.log(response.data, "hhhhhhhhhhhhhh");
//   let decodedImg = response;
//   console.log(decodedImg, "lllllll");
//   let imageBuffer = decodedImg.data;
//   console.log(imageBuffer, "lllllll");

//   let type = decodedImg.type;
//   console.log(type, "lllllll");

//   let extension = mime.extension(type);
//   console.log(extension, "lllllll");

//   let fileName = Date.now() + "." + extension;
//   console.log(fileName, "lllllll");

//   try {
//     fs.writeFileSync("./uploads/Galary/" + fileName, imageBuffer, "utf8");

//     const galaryObj = { widthimage: widthimage, heightimage: heightimage };

//     if (fileName) {
//       galaryObj.image = fileName;
//     }
//     const createdGalary = await galaryService.post(galaryObj);
//     return res.status(201).json({
//       success: true,
//       message: "Image added succesfully",
//       data: createdGalary,
//     });
//   } catch (e) {
//     next(e);
//   }

//   // const galaryObj = { widthimage: widthimage, heightimage: heightimage };
//   // if (req.files[0].filename) {
//   //   galaryObj.image = req.files[0].filename;
//   // }

//   // const createdGalary = await galaryService.post(galaryObj);
//   // return res.status(201).json({
//   //   success: true,
//   //   message: "Image added succesfully",
//   //   data: createdGalary,
//   // });
// };

const create = async (req, res, next) => {
  console.log(req.body,"hnhnhn")
  const { image, heightimage, widthimage } = req.body;
  var matches = req.body.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.extension(type);
  let fileName = Date.now() + "." + extension;
  try {
    fs.writeFileSync("./uploads/Galary/" + fileName, imageBuffer, "utf8");

    const galaryObj = { widthimage: widthimage, heightimage: heightimage };

    if (fileName) {
      galaryObj.image = fileName;
    }
    const createdGalary = await galaryService.post(galaryObj);
    return res.status(201).json({
      success: true,
      message: "Image added succesfully",
      data: createdGalary,
    });
  } catch (e) {
    next(e);
  }

  // const galaryObj = { widthimage: widthimage, heightimage: heightimage };
  // if (req.files[0].filename) {
  //   galaryObj.image = req.files[0].filename;
  // }

  // console.log(req.files[0].filename, "image");
  // let blog = {
  //   title,
  //   categoryId,
  //   discription,
  //   addedBy,
  // };
  // blog.addedBy = req._user._id;
  // // console.log(req.files[0], "gggggggg::::::");
  // if (req.files[0].filename) {
  //   galary.image = req.files[0].filename;
  // }
  // console.log(blog, "_____________");
  // const createdGalary = await galaryService.post(galaryObj);
  // return res.status(201).json({
  //   success: true,
  //   message: "Image added succesfully",
  //   data: createdGalary,
  // });
};
const getWithPagination = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;

    const response = await galaryService.getGalaryWithPagination(
      Number(pageNo),
      Number(limit)
    );
    //   .populate("categoryId")
    //   .populate("addedBy", "firstName");

    //   .populate("courseId");
    const count = await galary.count();
    if (!response) {
      return res.status(200).json({
        message: "Image not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Images get successfully",
        data: response,
        totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getWithPagination,
  createSimpleImage,
};
