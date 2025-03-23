import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth", // Reference to the Auth model
      required: true,
    },
    firstName: {
      type: String,
      required: false, // Optional field
    },
    lastName: {
      type: String,
      required: false, // Optional field
    },
    phoneNumber: {
      type: String,
      required: false, // Optional field
    },
    address: {
      type: String,
      required: false, // Optional field
    },
    city: {
      type: String,
      required: false, // Optional field
    },
    postalCode: {
      type: String,
      required: false, // Optional field
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
