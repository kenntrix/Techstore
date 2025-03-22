import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) {
    return next(
      errorHandler(401, "You are not logged in. Please login or register.")
    );
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Handle specific JWT errors
      if (err.name === "TokenExpiredError") {
        return next(
          errorHandler(401, "Your session has expired. Please login again.")
        );
      }
      if (err.name === "JsonWebTokenError") {
        return next(errorHandler(401, "Invalid token. Please login again."));
      }
      return next(
        errorHandler(401, "An error occurred while verifying the token.")
      );
    }

    request.user = user;
    next();
  });
};
