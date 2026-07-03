import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import http from "http";
import { Server } from "socket.io";
import dbConnect from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import Message from "./models/Messages.js";
import { colors } from "@mui/material";

dotenv.config();
dbConnect();

const app = express();

const server = http.createServer(app);

const io = new Server(server ,{
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET","POST"]
    }
});

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);

app.get("/" , (req,res)=>{
    res.send("Chat server is running");
});

io.on("connection", (socket)=>{
    console.log(`user connected : ${socket.id}`);

    socket.on("send_message", async (data)=>{
        try{
            const savedMessage = await Message.create({
            username : data.username,
            message : data.message
        });
        io.emit("recieve_message", data);
    }catch(error){
        console.log("Socket Error:", error.message);
    }
    });

socket.on("disconnect", ()=>{
    console.log(`user disconnected: ${socket.id}`);
});
});


const PORT = process.env.PORT || 5000;
server.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
});
