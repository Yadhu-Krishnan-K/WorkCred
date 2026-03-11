declare module '*.css';
import { Socket } from "socket.io-client";

declare global {
  var socket: Socket | undefined;
}

export {};