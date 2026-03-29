import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users.js"

const router1 = express.Router();

router1.post("/signup",async(req,res) => {
    try{
        const {username , password, role} = req.body;
        
        if(username && password) {
            const hashedPass = await bcrypt.hash(password, 10);
            const user = await Users.create({username, password : hashedPass, role});

            res.status(201).json({message : "You are signed up !!"});
        } else {
            res.status(400).json({message : "Username and password are required !!"});
        }

    } catch(err) {
        if(err.code == 11000) {
            res.status(409).json({message : "Username already exists !!"});
            return;
        }
        res.status(500).json({message : "Internal server error !!"});
    }
})

router1.post("/signin", async(req,res) => {
    try{
        const {username, password} = req.body;

        if(!username || !password) {
            res.status(400).json({error : "username and password required !!"});
            return ;
        }

        const user = await Users.findOne({username});
        if(!user) {
            res.status(404).json({message : "user does not exists."});
            return;
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch) {
            res.status(401).json({error : "Unauthorized"});
            return;
        }

        const token = jwt.sign({
            id : user._id, username : user.username , role : user.role}, 
            process.env.JWT_Secret);
            

        res.status(200).json({message : "You are signed in !!" , token});

    } catch(err) {
        res.status(500).json({message : err.message});
    }
})

export default router1;