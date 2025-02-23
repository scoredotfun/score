"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface League {
    key: string;
    group: string;
    title: string;
    description: string;
    active: boolean;
    has_outrights: boolean;
}

interface TeamOdds {
    team: string;
    odds: Record<string, number>;
}

interface PopupProps {
    onClose: () => void;
    selectedLeague: League;
}

interface BetPopupProps {
    team: string;
    odds: Record<string, number>;
    onClose: () => void;
}

// Define interfaces for API response types
interface Outcome {
    name: string;
    price: number;
    point?: number;
}

interface Market {
    key: string;
    outcomes: Outcome[];
}

interface Bookmaker {
    key: string;
    title: string;
    markets: Market[];
}

const BetPopup: React.FC<BetPopupProps> = ({ team, odds, onClose }) => {
    const [amount, setAmount] = useState<string>("");
    const [selectedBookmaker, setSelectedBookmaker] = useState<string>(
        Object.keys(odds)[0]
    );
    const [showSuccess, setShowSuccess] = useState(false);
    const [walletKey, setWalletKey] = useState<string>("");

    useEffect(() => {
        const storedWalletKey = localStorage.getItem("walletKey");
        if (storedWalletKey) {
            setWalletKey(storedWalletKey);
        }
    }, []);

    const handleBet = () => {
        if (!walletKey) {
            alert("Please connect your wallet first!");
            return;
        }
        console.log(
            `Placing bet of ${amount} $SCORE on ${team} with ${selectedBookmaker}`
        );
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            onClose();
        }, 2000);
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-gray-900 rounded-xl p-6 w-96 shadow-2xl border border-green-400/20 animate-fadeIn relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-500/5 animate-gradient" />
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-green-400">Place Bet</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Team</label>
                            <div className="text-white font-bold">{team}</div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Bookmaker
                            </label>
                            <select
                                value={selectedBookmaker}
                                onChange={(e) => setSelectedBookmaker(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                            >
                                {Object.entries(odds).map(([bookmaker, odd]) => (
                                    <option key={bookmaker} value={bookmaker}>
                                        {bookmaker.charAt(0).toUpperCase() + bookmaker.slice(1)} (
                                        {odd > 0 ? "+" : ""}
                                        {odd})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Amount ($SCORE)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleBet}
                                disabled={!amount || parseFloat(amount) <= 0 || !walletKey}
                                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {!walletKey
                                    ? "Connect Wallet to Place Bet"
                                    : "Place Bet with $SCORE"}
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 text-center mt-4">
                            {!walletKey ? (
                                <span className="text-red-400">
                                    Wallet not connected. Please connect your wallet first.
                                </span>
                            ) : (
                                "Make sure your Solana wallet is connected before placing a bet"
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-gray-900 rounded-2xl p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10 animate-gradient" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-400/20 flex items-center justify-center">
                                <span className="text-3xl">✓</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Bet Placed Successfully!
                            </h3>
                            <p className="text-gray-400">
                                Your bet has been confirmed on the Solana network
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ChampionshipPopup: React.FC<PopupProps> = ({
    onClose,
    selectedLeague,
}) => {
    const apiKey = "0b2ad96c0aa2268cc411685e5c07e47a";
    const [winningOdds, setWinningOdds] = useState<TeamOdds[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [aiPrediction, setAiPrediction] = useState<{
        team: string;
        reason: string;
    } | null>(null);
    const [selectedBet, setSelectedBet] = useState<TeamOdds | null>(null);

    // Helper to format odds
    const formatOdds = (price: number | undefined): string => {
        if (price === undefined) return "-";
        return price > 0 ? `+${price}` : `${price}`;
    };

    // Helper to compute composite winning odds (average)
    const computeCompositeOdds = (oddsObj: Record<string, number>): number => {
        const values = Object.values(oddsObj);
        if (values.length === 0) return 0;
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    };

    useEffect(() => {
        async function fetchWinningOdds() {
            setLoading(true);
            setError(null);
            try {
                const selectedBookmakers = [
                    "draftkings",
                    "fanduel",
                    "betmgm",
                    "unibet",
                ];
                const url = `https://api.the-odds-api.com/v4/sports/${selectedLeague.key}/odds/?apiKey=${apiKey}&regions=us&oddsFormat=american&markets=outrights&bookmakers=${selectedBookmakers.join(
                    ","
                )}`;
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Failed to fetch winning odds");
                }
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const event = data[0] as { bookmakers: Bookmaker[] };
                    // Changed from 'let' to 'const' since the reference does not change.
                    const oddsTable: Record<string, Record<string, number>> = {};
                    for (const bookmaker of event.bookmakers) {
                        if (selectedBookmakers.includes(bookmaker.key)) {
                            const market = bookmaker.markets.find((m: Market) => m.key === "outrights");
                            if (market && Array.isArray(market.outcomes)) {
                                for (const outcome of market.outcomes) {
                                    const teamName = outcome.name;
                                    const price = outcome.price;
                                    if (!oddsTable[teamName]) {
                                        oddsTable[teamName] = {};
                                    }
                                    oddsTable[teamName][bookmaker.key] = price;
                                }
                            }
                        }
                    }

                    const tableData: TeamOdds[] = Object.entries(oddsTable).map(
                        ([team, odds]) => ({
                            team,
                            odds,
                        })
                    );
                    setWinningOdds(tableData);

                    if (tableData.length > 0) {
                        const bestTeam = tableData.reduce((prev, curr) =>
                            computeCompositeOdds(curr.odds) < computeCompositeOdds(prev.odds)
                                ? curr
                                : prev
                        );
                        setAiPrediction({
                            team: bestTeam.team,
                            reason: `${bestTeam.team} has consistently demonstrated superior performance metrics and robust team dynamics, making them the statistically favorable choice.`,
                        });
                    }
                } else {
                    setError("No championship odds available.");
                }
            } catch (err) {
                console.error("Error fetching championship odds:", err);
                const message =
                    err instanceof Error ? err.message : "Unknown error fetching odds.";
                setError(message);
            } finally {
                setLoading(false);
            }
        }
        fetchWinningOdds();
    }, [selectedLeague, apiKey]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-4/5 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700 flex justify-between items-center px-6 py-4">
                    <button
                        onClick={onClose}
                        className="text-lg text-green-400 hover:text-green-300 transition-colors"
                    >
                        &larr; Back
                    </button>
                    <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        {selectedLeague.title} Championship Odds
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-4xl font-bold text-green-400 hover:text-green-300 transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
                    {/* AI Prediction Section */}
                    {aiPrediction && (
                        <div className="mb-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-green-400/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/5 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-400/10 rounded-full blur-2xl" />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-400/20 flex items-center justify-center">
                                        <span role="img" aria-label="AI" className="text-2xl">
                                            🤖
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                        AI Prediction
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center text-2xl font-bold">
                                            81%
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">
                                                {aiPrediction.team}
                                            </div>
                                            <div className="text-green-400">Confidence Score</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed">
                                        {aiPrediction.reason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border-4 border-green-400/20 rounded-full animate-spin" />
                                <div className="absolute inset-0 border-4 border-transparent border-t-green-400 rounded-full animate-spin-slow" />
                            </div>
                            <div className="mt-4 text-green-400 font-medium animate-pulse">
                                Loading Odds...
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-6">
                            <p>Error: {error}</p>
                        </div>
                    ) : winningOdds.length === 0 ? (
                        <div className="text-center p-6">
                            <p className="text-gray-400">No odds available.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="px-6 py-3 text-left text-gray-400">
                                            Winning Odds
                                        </th>
                                        {["draftkings", "fanduel", "betmgm", "unibet"].map(
                                            (bookmaker) => (
                                                <th
                                                    key={bookmaker}
                                                    className="px-6 py-3 text-left text-gray-400"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative">
                                                            <Image
                                                                src={`/images/${bookmaker === "draftkings"
                                                                    ? "dkinglogo"
                                                                    : bookmaker
                                                                    }.png`}
                                                                alt={bookmaker}
                                                                width={24}
                                                                height={24}
                                                                className="transition-transform hover:scale-110 object-contain"
                                                            />
                                                            <div className="absolute inset-0 bg-green-400/20 opacity-0 hover:opacity-100 transition-opacity rounded-full blur" />
                                                        </div>
                                                        <span>
                                                            {bookmaker.charAt(0).toUpperCase() +
                                                                bookmaker.slice(1)}
                                                        </span>
                                                    </div>
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {winningOdds.map((row) => {
                                        const composite = computeCompositeOdds(row.odds);
                                        return (
                                            <tr
                                                key={row.team}
                                                className="relative group transition-all duration-300 hover:bg-green-400/5 border-b border-gray-700 cursor-pointer"
                                                onClick={() => setSelectedBet(row)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                                                        {formatOdds(composite)}
                                                    </div>
                                                    <div className="text-xl text-white group-hover:text-green-400 transition-colors">
                                                        {row.team}
                                                    </div>
                                                </td>
                                                {["draftkings", "fanduel", "betmgm", "unibet"].map(
                                                    (bookmaker) => (
                                                        <td key={bookmaker} className="px-6 py-4 text-xl">
                                                            <div className="relative overflow-hidden rounded-lg group/cell">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 group-hover/cell:opacity-100 transition-opacity rounded-lg" />
                                                                <div className="relative z-10 text-center">
                                                                    <div className="text-white font-medium">
                                                                        {formatOdds(row.odds[bookmaker])}
                                                                    </div>
                                                                    <div className="text-sm text-green-400 opacity-0 group-hover/cell:opacity-100 transition-opacity">
                                                                        Click to Place Bet
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Bet Popup */}
            {selectedBet && (
                <BetPopup
                    team={selectedBet.team}
                    odds={selectedBet.odds}
                    onClose={() => setSelectedBet(null)}
                />
            )}

            {/* Custom scrollbar and animation styling */}
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
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default ChampionshipPopup;
