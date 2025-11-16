import { useEffect, useState } from "react";

const DashBoard = () => {
    const api = import.meta.env.VITE_BACKEND_URL;
    const [players, setPlayers] = useState([]);

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
        const interval = setInterval(() => {
            window.location.reload();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    const topThree = sortedPlayers.slice(0, 3);
    const rest = sortedPlayers.slice(3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 rounded-3xl">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                    🏆 Scoreboard Champions 🏆
                </h2>

                {!players.length ? (
                    <div className="text-center text-white font-bold text-2xl mt-20">
                        No players yet
                    </div>
                ) : (
                    <>
                        {/* Top 3 Podium */}
                        <div className="flex items-end justify-center gap-6 mb-16 flex-wrap">
                            {/* 2nd Place */}
                            {topThree[1] && (
                                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300 mb-8">
                                    <div className="relative">
                                        <div className="z-10 absolute -top-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                                            <div className="text-5xl">🥈</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl p-8 shadow-2xl border-4 border-gray-300 w-56 h-64 flex flex-col items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                                            </div>
                                            <div className="text-6xl font-black text-gray-700 mb-2 z-10">2nd</div>
                                            <div className="text-2xl font-bold text-gray-900 text-center mb-3 z-10 break-words w-full px-2">{topThree[1].name}</div>
                                            <div className="bg-white/80 rounded-full px-6 py-3 z-10">
                                                <div className="text-3xl font-bold text-gray-800">{topThree[1].score}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 1st Place */}
                            {topThree[0] && (
                                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                                    <div className="relative">
                                        <div className="z-10 absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                                            <div className="text-6xl">👑</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-2xl p-10 shadow-2xl border-4 border-yellow-400 w-64 h-80 flex flex-col items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                                            <div className="absolute inset-0 animate-pulse">
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-2xl"></div>
                                            </div>
                                            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-200 rounded-full blur-3xl"></div>
                                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
                                            </div>
                                            <div className="text-7xl mb-4 z-10">🏆</div>
                                            <div className="text-7xl font-black text-yellow-900 mb-3 z-10">1st</div>
                                            <div className="text-3xl font-bold text-yellow-900 text-center mb-4 z-10 break-words w-full px-2">{topThree[0].name}</div>
                                            <div className="bg-white rounded-full px-8 py-4 shadow-lg z-10">
                                                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">{topThree[0].score}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3rd Place */}
                            {topThree[2] && (
                                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300 mb-8">
                                    <div className="relative">
                                        <div className="z-10 absolute -top-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                                            <div className="text-5xl">🥉</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-8 shadow-2xl border-4 border-amber-600 w-56 h-64 flex flex-col items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
                                            <div className="absolute top-0 right-0 w-full h-full opacity-20">
                                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl"></div>
                                            </div>
                                            <div className="text-6xl font-black text-amber-200 mb-2 z-10">3rd</div>
                                            <div className="text-2xl font-bold text-amber-100 text-center mb-3 z-10 break-words w-full px-2">{topThree[2].name}</div>
                                            <div className="bg-amber-100 rounded-full px-6 py-3 z-10">
                                                <div className="text-3xl font-bold text-amber-900">{topThree[2].score}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rest of Players */}
                        {rest.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-gray-300 mb-6 text-center">Other Competitors</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {rest.map((player, i) => (
                                        <li
                                            key={player._id}
                                            className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-700"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 font-bold text-lg">#{i + 4}</span>
                                                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">{player.score}</span>
                                            </div>
                                            <span className="text-gray-200 text-lg font-semibold block truncate">{player.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default DashBoard;