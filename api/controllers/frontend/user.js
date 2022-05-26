// const authServices = require("../../services/auth.services");
// const { pick } = require("lodash");

// const editprofile = async (req, res) => {
//   console.log(req.body);
//   const conditions = {
//     _id: req.params.id,
//   };
//   console.log(conditions);
//   let data = pick(req.body, ["firstName", "lastName", "email"]);
//   try {
//     let result = await authServices.update(
//       conditions,
//       { $set: data },
//       { fields: { _id: 1 }, new: true }
//     );
//     if (result) {
//       return res.status(200).json({
//         message: "User updated  successfully",
//       });
//     } else {
//       return res.status(400).json({
//         message: "Something went wrong",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };
// const getUserById = async (req, res) => {
//   try {
//     const condition = {
//       _id: req.params.id,
//     };
//     let result = await authServices.findOne(condition);
//     if (!result) {
//       return res.status(200).send({
//         message: "user is not exists",
//       });
//     } else {
//       return res.status(200).json({
//         message: " success full",
//         data: result,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

// module.exports = {
//   editprofile,
//   getUserById,
// };
