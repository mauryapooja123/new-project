const authService = require("../../services/auth.services");
const _ = require("lodash");
const {
  generateToken,
  comparePassword,
  verifyJWT,
} = require("../../helpers/helper");
const bcrypt = require("bcrypt");
const { sendForgotPasswordMail } = require("../../helpers/helper");

const signin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await authService.findOne({ email });
    if (user) {
      const validUser = await comparePassword(req.body.password, user.password);
      if (!validUser) {
        return res.status(203).json({
          message: "Invalid username/password",
        });
      }
      if (user.role !== 1) {
        return res.status(203).send({
          message: "Access denied!",
          status: 403,
        });
      }
      const token = await generateToken(user);
      if (!token) {
        return res.status(206).json({
          message: "Error in generating token",
        });
      }
      res.status(200).json({
        message: "Logged In",
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      res.status(206).json({
        message: "Email doesn't not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }
    bcrypt.hash(password.toString(), 10, async (err, hash) => {
      try {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        const newUser = {
          ...req.body,
          password: hash,
        };

        const createdUser = await authService.post(newUser);
        return res.status(201).json({
          success: true,
          message: "registered successfully",
          data: createdUser,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          data: {},
          success: false,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  
  const { email } = req.body;
  console.log(email,"sssss")
  try {
    let result1 = await authService.findOne({ email });
    if (!result1) {
      return res.status(200).send({
        message: "Email is does not exist please enter correct Email",
        code: 404,
      });
    } else {
      const token = await generateToken(result1);
      const expireToken = Date.now() + 36000000;
      // error on testing  !!!
      // const payload = {
      //   resetToken: token,
      //   expireTokne: expireToken,
      // };
      // const result = await authService.update(
      //   { email, userId: result1._id, token: token },
      //   payload
      // );
      // console.log(result, "result");

      await sendForgotPasswordMail({
        token: token,
        email: email,
      });

      return res.status(200).json({
        message: "Email sent successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const resetPassword = async (req, res) => {
  const { resetLink, password } = req.body;
  try {
    if (resetLink) {
      let decodedData = verifyJWT(resetLink);

      const users = await authService.findOne(decodedData.data);

      if (users) {
        await authService.find({ resetLink: resetLink });
        try {
          if (!users) {
            return res.status(500).json({
              message: "User with this email does not Exists",
            });
          }
          let salt = await bcrypt.genSalt(10);
          bcrypt.hash(password.toString(), 10, async (err, hash) => {
            try {
              const obj = {
                password: hash,
              };
              user = _.extend(users, obj);

              user.save((err, result) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                } else {
                  return res
                    .status(200)
                    .json({ message: "Password Changed Successfully" });
                }
              });
            } catch (err) {
              return res.status(500).json({
                error: err.message,
              });
            }
          });
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      } else {
        return res.status(500).json({
          message: "Incorrect token or it is expired!!!!!",
        });
      }
    } else {
      if (err || !user) {
        return res.status(500).json({
          error: " error!!!!!",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      // error: "sorry can't change password!!!!!",
      error: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  let decoded = req._user;
  try {
    if (!req.body.oldPassword && !req.body.newpassword) {
      return res.send({
        status: 500,
        message: "Input can't be empty",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      decoded.password
    );

    if (decoded && validPassword) {
      const _id = decoded._id;
      const password = await bcrypt.hash(req.body.newpassword, 10);
      const payload = { password: password };
      const data = await authService.update({ _id: _id }, payload);

      return res.status(200).send({
        statusCode: 200,
        message: "Password changed successfully",
      });
    } else {
      return res.status(200).json({
        statusCode: 400,

        message: "Old Password is not matched",
      });
    }
  } catch (error) {
    return res.status(200).send({ statusCode: 500, message: error.message });
  }
};

module.exports = {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
};
