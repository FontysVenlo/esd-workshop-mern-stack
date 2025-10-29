import { useEffect } from "react";
import initSocket from "../../context/socket";

const DashBoard = ({ players }) => {

    useEffect(() => {
        const socket = initSocket();
    }, [])
    
    return (
        <div className="dashboard">
            <h2 className="title">Scoreboard</h2>
            <ul className="player-list">
                {players.map((player, index) => (
                    <li key={index} className="player-item">
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">{player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashBoard