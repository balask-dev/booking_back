import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export function verifyToken (req, res, next){
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Not Authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export function verifyUser(req, res, next){
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not authorized"));
    }
  });
};

export function verifyAdmin(req, res, next) {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not authorized"));
    }
  });
};
