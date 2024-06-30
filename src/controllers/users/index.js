const User = require("../../models/User");

const AppError = require("../../utils/appError");
const { encrypt } = require("../../utils/helpers");

const signUpUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return next(
        new AppError(400, "User with this email already exists"),
      );
    } else {
      const user = await User.create({
        ...req.body,
        password: encryptedPassword,
      });
      const token = encrypt.generateToken({ id: user.id });
      return res.status(201).json({
        status: "success",
        data: user,
        token: token,
      });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400) // 400 Bad Request is more appropriate here
        .json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new AppError("404", "Email or password is invalid"));
    }

    const isPasswordValid = encrypt.comparepassword(
      user.password,
      password,
    );
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Email or passworsd is invalid" });
    }
    const token = encrypt.generateToken({ id: user.id });
    return res.status(200).json({
      status: "success",
      data: user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req[" currentUser"]) {
      return res.status(401).json("UnAuthorized");
    }

    const user = await User.findOne({ _id: req[" currentUser"].id });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Convert Mongoose document to plain JavaScript object
    const userObject = user.toObject();

    // Remove password field from the object
    delete userObject.password;

    return res.status(200).json({
      status: "success",
      data: userObject,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getProfile,
};
