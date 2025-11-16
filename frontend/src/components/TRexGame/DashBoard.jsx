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
            const response = await fetch(`${api}/api/routes/users/get-user-all`, {
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
        <div className="dashboard max-w-4xl mx-auto p-6 bg-gray-700 text-gray-100 rounded-xl bg-">
            <h2 className="title text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Scoreboard
            </h2>
            <ul className="player-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {players
                    .sort((a, b) => b.score - a.score)
                    .map((player, i) => {
                        const color =
                            i === 0
                                ? "bg-yellow-300 text-black"
                                : i === 1
                                    ? "bg-gray-200 text-black"
                                    : i === 2
                                        ? "bg-amber-800 text-white"
                                        : "bg-gray-800 text-gray-100 hover:bg-gray-400";

                        return (
                            <li
                                key={player._id}
                                className={`player-item flex flex-col items-center justify-center rounded-lg p-4 transition ${color}`}
                            >
                                <span className="player-name text-lg font-semibold">{player.name}</span>
                                <span className="player-score text-sm mt-1">{player.score}</span>
                            </li>
                        );
                    })}
            </ul>
        </div>

    );
}

export default DashBoard