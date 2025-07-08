import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import Auth from "../models/auth.models.js";
import UserProfile from "../models/user.models.js";

//register new customer
export const signup = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;

    // Check if a user with the same username already exists
    const existingUserByUsername = await Auth.findOne({ username });
    if (existingUserByUsername) {
      return next(errorHandler(400, "Username already exists"));
    }

    // Check if a user with the same email already exists
    const existingUserByEmail = await Auth.findOne({ email });
    if (existingUserByEmail) {
      return next(errorHandler(400, "Email already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new Auth({ username, email, password: hashedPassword });

    // Save the new auth record to the database
    const savedUser = await newUser.save();

    // Step 4: Create an empty user profile linked to the new auth record
    const newUserProfile = new UserProfile({
      authId: savedUser._id, // Link the user profile to the auth record
    });

    // Save the new user profile to the database
    await newUserProfile.save();

    response
      .status(201)
      .json({ success: true, message: "User created successfully", savedUser });
  } catch (error) {
    next(errorHandler(500, "Error occurred signing up", error));
  }
};

//signin
export const signin = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const validUser = await Auth.findOne({ email });
    console.log("email:", email, "password:", password); 
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const { password: pass, ...rest } = validUser._doc;
    response
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "User has sign in successfully",
        user: rest,
      });
  } catch (error) {
    next(errorHandler(500, "Error occurred signing in", error));
  }
};

//signout
export const signout = (request, response, next) => {
  try {
    response
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "User has been signed out" });
  } catch (error) {
    next(errorHandler(500, "Error signing out."));
  }
};

export const updateUser = async (request, response, next) => {
  const { username, email, password } = request.body;
  const authId = request.user.id;

  // Ensure the user can only update their own account
  if (request.user.id !== authId) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // Prepare the update object
    const updateFields = {};

    if (username) {
      updateFields.username = username;
    }
    if (email) {
      updateFields.email = email;
    }
    if (password) {
      // Hash the password and add it to the updateFields object
      updateFields.password = bcryptjs.hashSync(password, 10);
    }

    // Update the user
    const updatedUser = await Auth.findByIdAndUpdate(authId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(errorHandler(404, "Auth not found"));
    }

    // Exclude sensitive fields from the response
    const { password: hashedPassword, ...rest } = updatedUser._doc;

    response.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error occurred while updating user."));
  }
};
