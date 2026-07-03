import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "./socket";
import "./App.css";

function App() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();

        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, []);

    const fetchMessages = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/messages"
        );

        setMessages(res.data);
    };

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("send_message", {
            username,
            message
        });

        setMessage("");
    };

    return (
        <div>
            <h1>Realtime Chat</h1>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <div>
                {messages.map((msg) => (
                    <div key={msg._id || Math.random()}>
                        <strong>{msg.username}</strong>
                        <p>{msg.message}</p>
                        <small>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                        </small>
                    </div>
                ))}
            </div>

            <input
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>
                Send
            </button>
        </div>
    );
}

export default App;