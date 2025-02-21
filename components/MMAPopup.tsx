"use client";
import React, { useState, useEffect } from "react";

interface Fight {
    id: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: Bookmaker[];
}

interface Bookmaker {
    key: string;
    title: string;
    markets: Market[];
}

interface Market {
    key: string;
    outcomes: Outcome[];
}

interface Outcome {
    name: string;
    price: number;
}

interface PopupProps {
    onClose: () => void;
}

const MMAPopup: React.FC<PopupProps> = ({ onClose }) => {
    const [fights, setFights] = useState<Fight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const apiKey = "960601334be61607620059689f8a77b1";

    useEffect(() => {
        const fetchFights = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/?apiKey=${apiKey}&regions=us&markets=h2h`
                );
                if (!response.ok) throw new Error('Failed to fetch fights');
                const data = await response.json();

                const validFights = data.filter((fight: Fight) => {
                    return fight.bookmakers.some(bookmaker =>
                        bookmaker.markets[0]?.outcomes?.some(outcome =>
                            typeof outcome.price === 'number' && !isNaN(outcome.price)
                        )
                    );
                });

                setFights(validFights);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch fights');
            } finally {
                setLoading(false);
            }
        };

        fetchFights();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-4/5 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700">
                    <div className="flex justify-between items-center px-6 py-4">
                        <h2 className="text-3xl font-extrabold tracking-wide text-green-400">
                            MMA Fights
                        </h2>
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="text-4xl font-bold text-green-400 hover:text-green-300 transition-colors"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-pulse flex space-x-2">
                                <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                                <div className="h-3 w-3 bg-green-400 rounded-full animation-delay-200"></div>
                                <div className="h-3 w-3 bg-green-400 rounded-full animation-delay-400"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-6">
                            <p>Error: {error}</p>
                        </div>
                    ) : fights.length === 0 ? (
                        <div className="text-center p-6">
                            <p className="text-gray-400">No fights found.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {fights.map((fight) => (
                                <div key={fight.id} className="animate-fadeIn">
                                    {/* Fight Header */}
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 mb-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-2xl font-bold">{fight.away_team}</div>
                                                <div className="text-green-400 text-xl">VS</div>
                                                <div className="text-2xl font-bold">{fight.home_team}</div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-green-400 text-sm">
                                                    {new Date(fight.commence_time).toLocaleDateString()}
                                                </div>
                                                <div className="text-gray-400 text-sm">
                                                    {new Date(fight.commence_time).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Odds Table */}
                                    <div className="p-4">
                                        <div className="relative overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-700">
                                                        <th className="w-[240px] text-left py-2 px-4 text-gray-400 font-medium">
                                                            Bookmaker
                                                        </th>
                                                        <th className="text-center py-2 px-4 text-gray-400 font-medium">
                                                            {fight.away_team}
                                                        </th>
                                                        <th className="text-center py-2 px-4 text-gray-400 font-medium">
                                                            {fight.home_team}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fight.bookmakers.map((bookmaker) => (
                                                        <tr key={bookmaker.key} className="border-b border-gray-800">
                                                            <td className="py-3 px-4 font-medium">
                                                                {bookmaker.title}
                                                            </td>
                                                            {bookmaker.markets[0]?.outcomes.map((outcome) => (
                                                                <td
                                                                    key={outcome.name}
                                                                    className="text-center py-3 px-4 cursor-pointer relative overflow-hidden group"
                                                                >
                                                                    <div className="relative z-10 transition-transform group-hover:scale-105">
                                                                        <span className="text-white font-medium">
                                                                            {outcome.price > 0 ? `+${outcome.price}` : outcome.price}
                                                                        </span>
                                                                        <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg" />
                                                                    </div>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1a2030;
                    border-radius: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #00bfff;
                    border-radius: 5px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #00bfff #1a2030;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
    );
};

export default MMAPopup;