import next from "next";
import http from "http";
import { Server } from "socket.io";
import Message from "./model/Message";
import { connectDB } from "./lib/db";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {

  await connectDB();

  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {

    console.log("Connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", async (data) => {

      const msg = new Message(data);
      await msg.save();

      io.to(data.roomId).emit("receiveMessage", data);
    });

  });

  server.listen(3000, () => {
    console.log("Server running on 3000");
  });
});
