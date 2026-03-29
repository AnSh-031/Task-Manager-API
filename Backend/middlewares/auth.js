import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const tokenVerify = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not Authorized" });
  }
  next();
};