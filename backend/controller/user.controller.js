import bcryptjs from "bcryptjs";
import UserProfile from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import Auth from "../models/auth.models.js";
import { request, response } from "express";

// 1. Create User Details
export const createUserProfile = async (request, response, next) => {
  try {
    const { firstName, lastName, phoneNumber, address, city, postalCode } =
      request.body;
    const authId = request.user.id;

    // Validate required fields
    if (!authId) {
      return next(errorHandler(400, "Auth ID is required"));
    }

    // Check if user details already exist for the given authId
    const existingUserProfile = await UserProfile.findOne({ authId });
    if (existingUserProfile) {
      return next(
        errorHandler(400, "User profile already exist for this user")
      );
    }

    // Create new user details
    const newUserProfile = new UserProfile({
      authId,
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      postalCode,
    });

    const savedUserProfile = await newUserProfile.save();
    response.status(201).json({
      success: true,
      message: "User profile created successfully",
      data: savedUserProfile,
    });
  } catch (error) {
    next(errorHandler(500, "Error occurred while creating user profile."));
  }
};

// 2. Get User Details by User ID
export const getUserProfileById = async (request, response, next) => {
  try {
    const authId = request.params.authId;

    // Find user details by userId
    const userProfile = await UserProfile.findOne({ authId }).populate(
      "authId",
      "username email"
    );

    if (!userProfile) {
      return next(errorHandler(404, "User details not found"));
    }

    response.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      data: userProfile,
    });
  } catch (error) {
    console.log(error);
    next(
      errorHandler(500, "Error occurred while fetching user profiles by ID")
    );
  }
};

// 3. Update User Details
export const updateUserProfile = async (request, response, next) => {
  const { firstName, lastName, phoneNumber, address, city, postalCode } =
    request.body;
  const authId = request.user.id;

  // Ensure the user can only update their own account
  if (request.user.id !== authId) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // Step 3: Prepare update fields for the UserProfile model
    const userProfileUpdateFields = {};
    if (firstName) {
      userProfileUpdateFields.firstName = firstName;
    }
    if (lastName) {
      userProfileUpdateFields.lastName = lastName;
    }
    if (phoneNumber) {
      userProfileUpdateFields.phoneNumber = phoneNumber;
    }
    if (address) {
      userProfileUpdateFields.address = address;
    }
    if (city) {
      userProfileUpdateFields.city = city;
    }
    if (postalCode) {
      userProfileUpdateFields.postalCode = postalCode;
    }

    // Step 2: Update the UserProfile model
    const updatedUserProfile = await UserProfile.findOneAndUpdate(
      { authId }, // Correct filter to find the user profile by authId
      { $set: userProfileUpdateFields }, // Use $set to update specific fields
      { new: true, runValidators: true } // Return the updated document and validate input
    );

    if (!updatedUserProfile) {
      return next(errorHandler(404, "User profile not found"));
    }

    response.status(200).json({
      success: true,
      message: "User profile details updated successfully.",
      userProfile: updatedUserProfile,
    });
  } catch (error) {
    console.log(error);
    next(
      errorHandler(500, "Error occurred while updating user profile details.")
    );
  }
};


// 4. Delete User Details
export const deleteUserProfile = async (request, response, next) => {
  const authId = request.user.id;

  try {
    // Step 1: Delete the user profile
    const deletedUserProfile = await UserProfile.findOneAndDelete({ authId });
    if (!deletedUserProfile) {
      return next(errorHandler(404, "User profile not found"));
    }

    // Step 2: Delete the corresponding auth record
    const deletedAuth = await Auth.findByIdAndDelete(authId);
    if (!deletedAuth) {
      return next(errorHandler(404, "Auth record not found"));
    }

    // Return success response
    response.status(200).json({
      success: true,
      message: "User profile and auth record deleted successfully",
    });
  } catch (error) {
    next(
      errorHandler(
        500,
        "Error occurred while deleting user profile and auth record."
      )
    );
  }
};

// Get all users
export const getAllUsers = async (request, response, next) => {
  const limit = parseInt(request.query.limit, 10) || 0;
  const { page = 1 } = request.query;
  const skip = (page - 1) * limit;

  try {
    let role = request.query.role;
    // If no specific role is requested or 'all' is specified, fetch all roles
    if (role === undefined || role === "all") {
      role = { $in: ["admin", "user"] };
    }

    const searchTerm = request.query.searchTerm || "";

    // Step 1: Find auth records based on role and search term
    const authRecords = await Auth.find({
      username: { $regex: searchTerm, $options: "i" },
      role,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (!authRecords.length) {
      return next(
        errorHandler(
          404,
          `Users not found for the specified search term, ${searchTerm}`
        )
      );
    }

    // Extract auth IDs for fetching user profiles
    const authIds = authRecords.map((auth) => auth._id);

    // Step 2: Fetch user profiles linked to the auth IDs
    const userProfiles = await UserProfile.find({ authId: { $in: authIds } });

    // Combine auth and user profile data
    const usersWithProfile = authRecords.map((auth) => {
      const userProfile = userProfiles.find(
        (profile) => profile.authId.toString() === auth._id.toString()
      );

      const { password, ...authWithoutPassword } = auth._doc; // Remove password field

      return {
        ...authWithoutPassword,
        profile: userProfile ? userProfile._doc : null, // Attach user profile
      };
    });

    // Get the total count of users for the given criteria
    const totalUsers = await Auth.countDocuments({
      username: { $regex: searchTerm, $options: "i" },
      role,
    });

    response.status(200).json({
      users: usersWithProfile,
      page,
      limit,
      totalUsers,
    });
  } catch (error) {
    next(errorHandler(500, "Error retrieving users from the database"));
  }
};
