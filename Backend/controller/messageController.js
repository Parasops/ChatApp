import Message from "../models/Messages.js";

export const sendMessages = async (req,res) =>{
    try{
        const { username , message } = req.body;
        const newMessage = await Message.create({
            username,
            message,
        });
        res.status(201).json(newMessage);
    } catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

export const getMessages = async (req,res)=>{
    try{
        const messages = await Message.find();
        res.json(messages);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};