const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

async function Register(req, res) {
  try {
    // role is NOT taken from req.body, so nobody can make themselves admin.
    // The schema default ("volunteer") will apply.
    const { name, email, password, phone } = req.body;

    // 400 = bad request (missing data)
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // lowercase first, so Krish@x.com and krish@x.com count as the same email
    const normalizedEmail = email.toLowerCase().trim();

    const userExist = await userModel.findOne({ email: normalizedEmail });

    // 409 = conflict (email already taken)
    if (userExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email: normalizedEmail,
      password: hash,
      phone,
    });

    // No token here: new users are "pending" until an admin approves them.
    // The token is issued at login, once status is "approved".

    // send only safe fields, never the password hash
    // 201 = created
    return res.status(201).json({
      message: "Registered successfully. Please wait for approval.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Something went wrong, please try again",
    });
  }
}

module.exports = { Register };