const userSchema = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { userName, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      userName,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: "User is successfully registerd",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "Error registering the user",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userSchema.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        message: "User with the username not found",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(400).json({
        message: "Invalid credantials",
      });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({
      message: "Error registering the user",
    });
  }
};
const logoutController = async (req, res) => {};
module.exports = { registerController, loginController, logoutController };
