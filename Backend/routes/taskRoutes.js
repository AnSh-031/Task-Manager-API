import express from "express";
import {tokenVerify,verifyAdmin} from "../middlewares/auth.js";
import Tasks from "../models/tasks.js";

const router2 = express.Router();

router2.post("/",tokenVerify, async(req,res) => {
    try{
        const {title,description} = req.body;
        if(!title) {
            res.status(400).json({message : "Title is required."})
            return;
        }

        const newTask = await Tasks.create({
            title,
            description,
            createdBy : req.user.id
        });

        res.status(201).json({message : "Task added !!"});
    }catch(err) {
        res.status(500).json({message : "Internal server error."});
    }
})

router2.get("/",tokenVerify,async(req,res) => {
    try{
        const allTasks = req.user.role == "admin" ? await Tasks.find() : await Tasks.find({createdBy : req.user.id});
        res.status(200).json({Tasks : allTasks});
    }catch(err) {
        res.status(500).json({message : "Internal server error."});
    }
})

router2.get("/:id",tokenVerify,async(req, res) => {
    try {
        const task = req.user.role == "admin" ? 
            await Tasks.findById(req.params.id) :
            await Tasks.findOne({_id : req.params.id, createdBy : req.user.id});

        if (!task) {
        return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({Task : task});
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router2.put("/:id",tokenVerify,async(req,res) => {
    try{
        const {title , description , status} = req.body;
        if(!title && !description && !status) {
            res.status(400).json({message : "Incomplete fields."});
            return;
        }
        const updatedTask = await Tasks.findOneAndUpdate({
            _id : req.params.id,
            createdBy : req.user.id}, 
            {title,description,status},
            {new : true}
        );

        if(!updatedTask) {
            res.status(404).json({message : "Task not found."});
            return;
        }

        res.status(200).json({message : "Task updated."});
    }catch(err) {
        res.status(500).json({message : "Internal server error."});
    }
})

router2.delete("/:id",tokenVerify,verifyAdmin,async(req,res) => {
    try{
        const toDelete = await Tasks.findByIdAndDelete(req.params.id);
        if(!toDelete) {
            res.status(404).json({message : "Task not found."});
            return;
        }
        res.status(200).json({message : "Task Deleted."})
    }catch(err) {
        res.status(500).json({message : "Internal server error"});
    }
})

export default router2;