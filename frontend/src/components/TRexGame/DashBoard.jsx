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
        console.log(onList)

        return () => {
            socket.off("newPlayers",onList);
        };

    }, [])

    return (
        <div className="dashboard">
            <h2 className="title">Scoreboard</h2>
            <ul className="player-list">
                {players.map((player) => (
                    <li key={player._id} className="player-item">
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">{player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashBoard