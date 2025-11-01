import { io } from 'socket.io-client';

let socket;
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const initSocket = () => {
    if (!socket) {
        // Initialize the WebSocket connection with autoConnect disabled
        socket = io(`${apiUrl}`, {
            withCredentials: true, // must match backend CORS settings
        });

        // Add logging to track connection and disconnection
        socket.on('connect', () => {
            console.log(`WebSocket connected with ID: ${socket.id}`);

        });

        socket.on('disconnect', () => {

            console.log('WebSocket disconnected');
        });

        socket.on("connect_error", (err) => {
            console.log("connect_error:", err?.message, err);
        });
        socket.on("reconnect_error", (err) => console.log("reconnect_error:", err?.message));

    }
    return socket;
};

export default initSocket;