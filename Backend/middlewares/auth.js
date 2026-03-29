import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const tokenVerify = (req,res,next) => {
    const token = req.headers.token;
    if(!token) {
        res.status(401).json({message : "No token provided"});
        return;
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_Secret);
        req.user = decoded;

        next();
    } catch(err) {
        res.status(401).json({message : "token invalid"});
    }
};

export const verifyAdmin = (req,res,next) => {
    if(req.user.role != "admin") {
        res.status(403).json({message : "Not Authorized"});
        return;
    }
    next();
}