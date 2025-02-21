"use client";
import React, { useState, useEffect } from "react";

// ---------------------------
// Type Definitions
// ---------------------------
interface League {
    key: string;
    group: string;
    title: string;
    description: string;
    active: boolean;
    has_outrights: boolean;
}

interface BetPopupProps {
    game: Game;
    marketType: MarketType;
    selectedTeam: string;
    odds: number;
    onClose: () => void;
}

export interface Outcome {
    name: string;
    price: number;
    point?: number;
}

export interface Market {
    key: string;
    outcomes: Outcome[];
}

export interface Bookmaker {
    key: string;
    title: string;
    markets: Market[];
}

export interface Game {
    id: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: Bookmaker[];
}

type MarketType = "h2h" | "spreads" | "totals";

interface PopupProps {
    onClose: () => void;
    selectedLeague?: League;
}

// ---------------------------
// BetPopup Component
// ---------------------------
const BetPopup: React.FC<BetPopupProps> = ({ game, marketType, selectedTeam, odds, onClose }) => {
    const [amount, setAmount] = useState<string>("");
    const [walletKey, setWalletKey] = useState<string>("");

    // Get wallet status from localStorage on component mount
    useEffect(() => {
        const storedWalletKey = localStorage.getItem('walletKey');
        if (storedWalletKey) {
            setWalletKey(storedWalletKey);
        }
    }, []);

    const handleBet = () => {
        if (!walletKey) {
            alert("Please connect your wallet first!");
            return;
        }

        // Rest of betting logic
        console.log(`Placing bet of ${amount} $SCORE on ${selectedTeam} with odds ${odds}`);
        onClose();
    };

    const calculatePotentialWinnings = () => {
        const bet = parseFloat(amount);
        if (isNaN(bet)) return 0;

        if (odds > 0) {
            return (bet * (odds / 100)).toFixed(2);
        } else {
            return (bet * (100 / Math.abs(odds))).toFixed(2);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-gray-900 rounded-xl p-6 w-96 shadow-2xl border border-green-400/20 animate-fadeIn" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-green-400">Place Bet</h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Game</label>
                        <div className="text-white font-bold">
                            {game.away_team} vs {game.home_team}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Bet Type</label>
                        <div className="text-white">
                            {marketType === "h2h" ? "Money Line" :
                                marketType === "spreads" ? "Spread" : "Totals"}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Selection</label>
                        <div className="text-white font-bold">{selectedTeam}</div>
                        <div className="text-green-400 text-sm">Odds: {odds > 0 ? `+${odds}` : odds}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Amount ($SCORE)</label>
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

                    <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Potential Winnings</div>
                        <div className="text-green-400 font-bold text-lg">
                            {calculatePotentialWinnings()} $SCORE
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleBet}
                            disabled={!amount || parseFloat(amount) <= 0 || !walletKey}
                            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {!walletKey ? 'Connect Wallet to Place Bet' : 'Place Bet with $SCORE'}
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 text-center mt-4">
                        {!walletKey ? (
                            <span className="text-red-400">Wallet not connected. Please connect your wallet first.</span>
                        ) : (
                            'Make sure your Solana wallet is connected before placing a bet'
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---------------------------
// BasketballPopup Component
// ---------------------------
const BasketballPopup: React.FC<PopupProps> = ({ onClose, selectedLeague: initialLeague }) => {
    const apiKey = "960601334be61607620059689f8a77b1";

    // Define allowed bookmakers
    const ALLOWED_BOOKMAKERS = [
        'fanduel',
        'draftkings',
        'betrivers',
        'betmgm',
        'bovada'
    ];

    // Mapping bookmaker keys to logo image paths
    const bookmakerLogos: Record<string, string> = {
        draftkings: "/images/dkinglogo.png",
        fanduel: "/images/fanduel.png",
        betmgm: "/images/betmgm.png",
        betrivers: "/images/betrivers.png",
        bovada: "/images/bovada.jpg",
    };

    const [selectedBet, setSelectedBet] = useState<{
        game: Game;
        marketType: MarketType;
        team: string;
        odds: number;
    } | null>(null);

    const [selectedLeague, setSelectedLeague] = useState<League | null>(initialLeague ?? null);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [leaguesLoading, setLeaguesLoading] = useState<boolean>(false);
    const [leaguesError, setLeaguesError] = useState<string | null>(null);

    // States for game data
    const [activeMarket, setActiveMarket] = useState<MarketType>("h2h");
    const [gamesCache, setGamesCache] = useState<Record<MarketType, Game[]>>({
        h2h: [],
        spreads: [],
        totals: [],
    });
    const [loadingCache, setLoadingCache] = useState<Record<MarketType, boolean>>({
        h2h: false,
        spreads: false,
        totals: false,
    });
    const [errorCache, setErrorCache] = useState<Record<MarketType, string | null>>({
        h2h: null,
        spreads: null,
        totals: null,
    });

    // Helper function to format outcomes
    const formatOutcome = (outcome?: Outcome): string => {
        if (!outcome) return "-";
        if (outcome.point !== undefined) {
            const sign = outcome.point > 0 ? "+" : "";
            return `${sign}${outcome.point} (${outcome.price > 0 ? "+" : ""}${outcome.price})`;
        }
        return outcome.price > 0 ? `+${outcome.price}` : `${outcome.price}`;
    };

    // Fetch Basketball Leagues
    useEffect(() => {
        if (!selectedLeague) {
            async function fetchLeagues() {
                setLeaguesLoading(true);
                setLeaguesError(null);
                try {
                    const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;
                    const res = await fetch(url);
                    const data: League[] = await res.json();
                    const basketballLeagues = data.filter(
                        (league) =>
                            league.group.toLowerCase() === "basketball" &&
                            !league.title.toLowerCase().includes("euroleague")
                    );
                    setLeagues(basketballLeagues);
                } catch (error) {
                    console.error("Error fetching basketball leagues:", error);
                    setLeaguesError("Failed to load basketball leagues.");
                } finally {
                    setLeaguesLoading(false);
                }
            }
            fetchLeagues();
        }
    }, [apiKey, selectedLeague]);

    // Fetch games for a given market
    const fetchGamesForMarket = async (market: MarketType) => {
        if (!selectedLeague) return;
        setLoadingCache((prev) => ({ ...prev, [market]: true }));
        setErrorCache((prev) => ({ ...prev, [market]: null }));
        try {
            const region = "us";
            const oddsFormat = "american";
            const url = `https://api.the-odds-api.com/v4/sports/${selectedLeague.key}/odds/?regions=${region}&oddsFormat=${oddsFormat}&markets=${market}&apiKey=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch games");
            }
            const data: Game[] = await response.json();

            // Filter games to only include allowed bookmakers
            const filteredData = data.map(game => ({
                ...game,
                bookmakers: game.bookmakers.filter(bookmaker =>
                    ALLOWED_BOOKMAKERS.includes(bookmaker.key)
                )
            }));

            setGamesCache((prev) => ({ ...prev, [market]: filteredData }));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error fetching games.";
            setErrorCache((prev) => ({ ...prev, [market]: message }));
        } finally {
            setLoadingCache((prev) => ({ ...prev, [market]: false }));
        }
    };

    // When a league is selected, pre-load all markets
    useEffect(() => {
        if (selectedLeague) {
            (["h2h", "spreads", "totals"] as MarketType[]).forEach((market) => {
                fetchGamesForMarket(market);
            });
        }
    }, [selectedLeague]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-4/5 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700">
                    <div className="flex justify-between items-center px-6 py-4">
                        {selectedLeague ? (
                            <>
                                <button
                                    onClick={() => setSelectedLeague(null)}
                                    className="text-lg text-green-400 hover:text-green-300 transition-colors mr-4"
                                >
                                    ← Back
                                </button>
                                <h2 className="text-3xl font-extrabold tracking-wide text-green-400">
                                    {selectedLeague.title} Games
                                </h2>
                            </>
                        ) : (
                            <h2 className="text-3xl font-extrabold tracking-wide text-green-400">
                                Select a Basketball League
                            </h2>
                        )}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="text-4xl font-bold text-green-400 hover:text-green-300 transition-colors"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Tabs for game view */}
                    {selectedLeague && (
                        <div className="flex gap-2 px-4">
                            {(["h2h", "spreads", "totals"] as MarketType[]).map((market) => (
                                <button
                                    key={market}
                                    onClick={() => setActiveMarket(market)}
                                    className={`px-4 py-3 text-sm font-medium relative ${activeMarket === market ? "text-green-400" : "text-gray-400 hover:text-green-400"
                                        }`}
                                >
                                    {market === "h2h" ? "Money Line" : market === "spreads" ? "Spread" : "Totals"}
                                    {activeMarket === market && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto max-h-[70vh] relative">
                    {!selectedLeague ? (
                        // League Selection View
                        <div className="p-6">
                            {leaguesLoading ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="animate-pulse flex space-x-2">
                                        <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                                        <div className="h-3 w-3 bg-green-400 rounded-full animation-delay-200"></div>
                                        <div className="h-3 w-3 bg-green-400 rounded-full animation-delay-400"></div>
                                    </div>
                                </div>
                            ) : leaguesError ? (
                                <div className="text-center text-red-500 p-6">
                                    <p>Error: {leaguesError}</p>
                                </div>
                            ) : leagues.length === 0 ? (
                                <div className="text-center p-6">
                                    <p className="text-gray-400">No basketball leagues found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {leagues.map((league) => (
                                        <button
                                            key={league.key}
                                            className="relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-green-400/50 group overflow-hidden"
                                            onClick={() => setSelectedLeague(league)}
                                        >
                                            <div className="relative z-10">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400">
                                                    {league.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    {league.description || "Basketball League"}
                                                </p>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        // Game View
                        <>
                            {loadingCache[activeMarket] && gamesCache[activeMarket].length === 0 ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="animate-pulse flex space-x-2">
                                        <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                                        <div className="h-3 w-3 bg-green-400 rounded-full animation-delay-200"></div>
                                        <div className="h-3 w-3 bg-green-400 rounded-full animation-delay-400"></div>
                                    </div>
                                </div>
                            ) : errorCache[activeMarket] ? (
                                <div className="text-center text-red-500 p-6">
                                    <p>Error: {errorCache[activeMarket]}</p>
                                </div>
                            ) : gamesCache[activeMarket].length === 0 ? (
                                <div className="text-center p-6">
                                    <p className="text-gray-400">No games found.</p>
                                </div>
                            ) : (
                                <div className="space-y-8 p-6">
                                    {gamesCache[activeMarket].map((game: Game) => (
                                        <div key={game.id}>
                                            {/* Game Header - Enhanced Visual Card */}
                                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 mb-6">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-2xl font-bold">{game.away_team}</div>
                                                        <div className="text-green-400 text-xl">VS</div>
                                                        <div className="text-2xl font-bold">{game.home_team}</div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <div className="text-green-400 text-sm">
                                                            {new Date(game.commence_time).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-gray-400 text-sm">
                                                            {new Date(game.commence_time).toLocaleTimeString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Game Odds Table */}
                                            <div className="p-4">
                                                <div className="relative">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="border-b border-gray-700">
                                                                <th className="w-[240px] text-left py-2 px-4 text-gray-400 font-medium">
                                                                    Bookmaker
                                                                </th>
                                                                {activeMarket === "totals" ? (
                                                                    <>
                                                                        <th className="text-center py-2 px-4 text-gray-400 font-medium">
                                                                            Over
                                                                        </th>
                                                                        <th className="text-center py-2 px-4 text-gray-400 font-medium">
                                                                            Under
                                                                        </th>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <th className="text-center py-2 px-4 text-gray-400 font-medium">
                                                                            {game.away_team}
                                                                        </th>
                                                                        <th className="text-center py-2 px-4 text-gray-400 font-medium">
                                                                            {game.home_team}
                                                                        </th>
                                                                    </>
                                                                )}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {game.bookmakers
                                                                .filter(bookmaker => ALLOWED_BOOKMAKERS.includes(bookmaker.key))
                                                                .map((bookmaker: Bookmaker) => {
                                                                    const marketData = bookmaker.markets.find(
                                                                        (m) => m.key === activeMarket
                                                                    );
                                                                    const outcome1 = marketData?.outcomes[0];
                                                                    const outcome2 = marketData?.outcomes[1];
                                                                    return (
                                                                        <tr
                                                                            key={bookmaker.key}
                                                                            className="border-b border-gray-700 last:border-none hover:bg-gray-800/50 relative group transition-all"
                                                                        >
                                                                            <td className="w-[240px] py-3 px-4">
                                                                                <div className="flex items-center gap-2">
                                                                                    {bookmakerLogos[bookmaker.key] && (
                                                                                        <img
                                                                                            src={bookmakerLogos[bookmaker.key]}
                                                                                            alt={bookmaker.title}
                                                                                            className="w-6 h-6"
                                                                                        />
                                                                                    )}
                                                                                    <span className="text-sm font-medium">
                                                                                        {bookmaker.title}
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            {activeMarket === "totals" ? (
                                                                                <>
                                                                                    <td
                                                                                        className="text-center py-3 px-4 cursor-pointer relative overflow-hidden group"
                                                                                        onClick={() => setSelectedBet({
                                                                                            game,
                                                                                            marketType: activeMarket,
                                                                                            team: "Over",
                                                                                            odds: outcome1?.price || 0
                                                                                        })}
                                                                                    >
                                                                                        <div className="relative z-10 transition-transform group-hover:scale-105">
                                                                                            <span className="text-white font-medium">
                                                                                                {formatOutcome(outcome1)}
                                                                                            </span>
                                                                                            <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg" />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td
                                                                                        className="text-center py-3 px-4 cursor-pointer relative overflow-hidden group"
                                                                                        onClick={() => setSelectedBet({
                                                                                            game,
                                                                                            marketType: activeMarket,
                                                                                            team: "Under",
                                                                                            odds: outcome2?.price || 0
                                                                                        })}
                                                                                    >
                                                                                        <div className="relative z-10 transition-transform group-hover:scale-105">
                                                                                            <span className="text-white font-medium">
                                                                                                {formatOutcome(outcome2)}
                                                                                            </span>
                                                                                            <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg" />
                                                                                        </div>
                                                                                    </td>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <td
                                                                                        className="text-center py-3 px-4 cursor-pointer relative overflow-hidden group"
                                                                                        onClick={() => setSelectedBet({
                                                                                            game,
                                                                                            marketType: activeMarket,
                                                                                            team: game.away_team,
                                                                                            odds: outcome1?.price || 0
                                                                                        })}
                                                                                    >
                                                                                        <div className="relative z-10 transition-transform group-hover:scale-105">
                                                                                            <span className="text-white font-medium">
                                                                                                {formatOutcome(outcome1)}
                                                                                            </span>
                                                                                            <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg" />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td
                                                                                        className="text-center py-3 px-4 cursor-pointer relative overflow-hidden group"
                                                                                        onClick={() => setSelectedBet({
                                                                                            game,
                                                                                            marketType: activeMarket,
                                                                                            team: game.home_team,
                                                                                            odds: outcome2?.price || 0
                                                                                        })}
                                                                                    >
                                                                                        <div className="relative z-10 transition-transform group-hover:scale-105">
                                                                                            <span className="text-white font-medium">
                                                                                                {formatOutcome(outcome2)}
                                                                                            </span>
                                                                                            <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg" />
                                                                                        </div>
                                                                                    </td>
                                                                                </>
                                                                            )}
                                                                        </tr>
                                                                    );
                                                                })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {loadingCache[activeMarket] && gamesCache[activeMarket].length > 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                    <span className="text-green-400 text-lg">Updating...</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Bet Popup */}
            {selectedBet && (
                <BetPopup
                    game={selectedBet.game}
                    marketType={selectedBet.marketType}
                    selectedTeam={selectedBet.team}
                    odds={selectedBet.odds}
                    onClose={() => setSelectedBet(null)}
                />
            )}

            {/* Custom scrollbar styling */}
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
                /* Gradient text effect */
                .gradient-text {
                    background: linear-gradient(to right, #00ff87, #60efff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                /* Smooth transitions */
                .transition-all {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                /* Glass effect */
                .glass-effect {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                /* Animation delay utilities */
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

export default BasketballPopup;
