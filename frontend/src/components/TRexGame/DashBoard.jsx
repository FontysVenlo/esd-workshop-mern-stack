import { useEffect, useState, useRef } from "react";
import initSocket from "../../context/socket";


const DashBoard = () => {
    const api = import.meta.env.VITE_BACKEND_URL;
    const [players, setPlayers] = useState([]);
    const socketRef = useRef();

    if (!socketRef.current) {
        socketRef.current = initSocket();
    }
    const socket = socketRef.current;


    const getAllPlayers = async (e) => {

        try {
            const response = await fetch(`${api}/api/routes/get-user-all`, {
                method: 'GET',
                headers: { "Accept": "application/json" },
            });

            const dataFromResponce = await response.json();

            if (!response.ok) {
                console.log("No Users yet")
                return;
            }
            setPlayers(dataFromResponce.users)



        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllPlayers()
    }, [api])

    useEffect(() => {

        if (!socket.connected) {
            socket.connect();
        }

        const onList = (list) => setPlayers(list);
        socket.on("newPlayers", onList);
        return () => {
            socket.off("newPlayers", onList);
        };

    }, [])

    return (
        <div className="dashboard max-w-4xl mx-auto p-6 bg-gray-700 text-gray-100 rounded-xl">
            <h2 className="title text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Scoreboard
            </h2>
            <ul className="player-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {players.map((player) => (
                    <li
                        key={player._id}
                        className="player-item flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 hover:bg-gray-500 transition"
                    >
                        <span className="player-name text-lg font-medium">{player.name}</span>
                        <span className="player-score text-sm text-gray-400 mt-1">
                            {player.score}
                        </span>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default DashBoard