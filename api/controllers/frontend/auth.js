const _ = require("lodash");
const signupService = require("../../services/auth.services");

const {
  generateToken,
  comparePassword,
  verifyJWT,
  sendForgotPasswordMail,
  generateTokenForUSer,
} = require("../../helpers/helper");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupService.findOne({ email });
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

        const createdUser = await signupService.post(newUser);
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

const signin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await signupService.findOne({ email });
    if (user) {
      const validUser = await comparePassword(req.body.password, user.password);
      if (!validUser) {
        return res.status(203).json({
          message: "Invalid username/password",
        });
      }
      // if (user.role == 1) {
      //   return res.status(200).send({
      //     message: "Access denied!",
      //     status: 403,
      //   });
      // }
      const token = await generateTokenForUSer(user._id);
      if (!token) {
        return res.status(403).json({
          message: "error in generating token",
        });
      }
      res.status(200).json({
        message: "Authenticated",
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      res.status(403).json({
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let result1 = await signupService.findOne({ email });
    if (!result1) {
      return res.status(200).send({
        message: "Email is does not exist please enter correct Email",
        code: 404,
      });
    } else {
      const token = await generateToken(result1);

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
      const users = await signupService.findOne(decodedData.data);

      if (users) {
        await signupService.find({ resetLink: resetLink });
        try {
          if (!users) {
            return res.status(500).json({
              error: "User with this email does not Exists",
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
                    .json({ message: "password changed successfully" });
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
          error: "incorrect token or it is expired!!!!!",
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
      const data = await signupService.update({ _id: _id }, payload);
      return res.status(200).send({
        message: "Password changed successfully",
      });
    } else {
      return res.status(400).json({
        data: data,
        message: "Old Password is not matched",
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
module.exports = {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
};
