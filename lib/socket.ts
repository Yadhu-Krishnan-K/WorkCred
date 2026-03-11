// import { io, Socket } from "socket.io-client";

// const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

// export const socket: Socket = io(URL, {
//   withCredentials: true,
// });
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

let socket: Socket;

if (!globalThis.socket) {
  globalThis.socket = io(URL, {
    withCredentials: true,
  });
}

socket = globalThis.socket;
console.log('socket Id of this user =============================$$$$$$$$$$$$$$$$$$$$$$$$4^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^67&&&&&&&&&&&&&&&&&&&&&&&&&',socket)
export { socket };