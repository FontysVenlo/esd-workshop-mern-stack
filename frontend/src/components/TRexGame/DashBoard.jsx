import { useEffect, useState } from "react";
import initSocket from "../../context/socket";

const DashBoard = () => {
    const api = import.meta.env.VITE_BACKEND_URL;
    const [players, setPlayers] = useState([]);


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
        const socket = initSocket();
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