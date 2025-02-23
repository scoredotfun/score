"use client";
import React, { useState, useEffect } from "react";
import BasketballPopup from "./BasketballPopup";
import ChampionshipPopup from "./ChampionshipPopup";
import MMAPopup from "./MMAPopup";
import CyberpunkBackground from './CyberpunkBackground';

interface League {
    key: string;
    group: string;
    title: string;
    description: string;
    active: boolean;
    has_outrights: boolean;
}

export default function PredictionsSection() {
    // State to track the active category filter
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
    // Show popup for both normal basketball leagues and championship winner bets.
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showMMAPopup, setShowMMAPopup] = useState<boolean>(false);

    // State for game counts per category (setter removed as it's not used)
    const [gameCounts] = useState({
        All: 63,
        Soccer: 41,
        Basketball: 6,
        "American Football": 1,
        "Ice Hockey": 7,
        Boxing: 1,
        Baseball: 4,
        MMA: 1,
    });

    // State for all sports leagues
    const [allLeagues, setAllLeagues] = useState<{ [key: string]: League[] }>({
        Soccer: [],
        Basketball: [],
        "American Football": [],
        "Ice Hockey": [],
        Boxing: [],
        Baseball: [],
        MMA: [],
    });

    const apiKey = "960601334be61607620059689f8a77b1";

    // Fetch all sports leagues on component mount
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`);
                const data = await response.json();

                // Group leagues by category
                const groupedLeagues: { [key: string]: League[] } = {
                    Soccer: [],
                    Basketball: [],
                    "American Football": [],
                    "Ice Hockey": [],
                    Boxing: [],
                    Baseball: [],
                    MMA: [],
                };

                data.forEach((league: League) => {
                    if (groupedLeagues[league.group]) {
                        if (league.group === "Basketball" && league.title.toLowerCase().includes("euroleague")) {
                            return; // Skip Euroleague
                        }
                        groupedLeagues[league.group].push(league);
                    }
                });

                setAllLeagues(groupedLeagues);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };

        fetchLeagues();
    }, []);

    // Get leagues to display based on active category
    const getDisplayLeagues = () => {
        if (activeCategory === "All") {
            const allLeaguesList = Object.values(allLeagues).flat();

            // Sort function to prioritize Basketball and Football
            return allLeaguesList.sort((a, b) => {
                // Priority order: Basketball > American Football > Others
                const getPriority = (group: string) => {
                    if (group === "Basketball") return 0;
                    if (group === "American Football") return 1;
                    if (group === "Soccer") return 3;  // Push soccer to the end
                    return 2;  // Other sports in the middle
                };

                return getPriority(a.group) - getPriority(b.group);
            });
        }
        return allLeagues[activeCategory] || [];
    };

    // List of filter categories (including "All")
    const categories = [
        { icon: "🎯", label: "All" },
        { icon: "🏀", label: "Basketball" },
        { icon: "🏈", label: "American Football" },
        { icon: "🏒", label: "Ice Hockey" },
        { icon: "🥊", label: "Boxing" },
        { icon: "⚾", label: "Baseball" },
        { icon: "🥋", label: "MMA" },
        { icon: "⚽", label: "Soccer" },
    ];

    // Determine if the selected league is a championship bet (e.g. contains "championship winner")
    const isChampionship =
        selectedLeague &&
        (selectedLeague.title.toLowerCase().includes("championship winner") ||
            selectedLeague.title.toLowerCase().includes("world series winner"));

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#000000] via-[#000000] to-[#000000] py-20">
            <CyberpunkBackground />

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced Section Header */}
                <div className="max-w-4xl mx-auto text-center mb-20 relative">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-[#00BFFF] to-transparent opacity-50" />
                    <div className="relative">
                        <h2 className="text-7xl font-bold mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] via-white to-[#00BFFF] animate-gradient">
                                PREDICTIONS
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Our AI-powered system analyzes thousands of data points to deliver accurate predictions. Select a league to start betting!
                        </p>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent opacity-50" />
                    </div>
                </div>

                {/* Gradient backdrop container for categories and cards */}
                <div className="relative p-8 rounded-3xl backdrop-blur-sm overflow-hidden">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 via-black/50 to-[#FB4141]/10 border border-[#00BFFF]/20 rounded-3xl" />

                    {/* Filter Categories */}
                    <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map(({ icon, label }) => (
                            <button
                                key={label}
                                onClick={() => setActiveCategory(label)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${activeCategory === label
                                    ? "bg-[#00BFFF] text-white"
                                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                                    }`}
                            >
                                <span>{icon}</span>
                                <span>{label}</span>
                                <span className="ml-2 text-sm">({gameCounts[label]})</span>
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Cards Container */}
                    <div className="max-h-[70vh] overflow-y-auto px-6 pb-8 custom-scrollbar relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                            {getDisplayLeagues().map((league) => (
                                <button
                                    key={league.key}
                                    className="relative bg-black/40 rounded-2xl border border-[#1A2030] p-8 transition-all duration-500 transform hover:scale-105 hover:border-[#00BFFF] group backdrop-blur-sm min-h-[200px]"
                                    onClick={() => {
                                        setSelectedLeague(league);
                                        setShowPopup(true);
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00BFFF] transition-colors">
                                            {league.title}
                                        </h3>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {league.description || "Basketball League"}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                        <span className="text-[#00BFFF]">View Games →</span>
                                    </div>
                                </button>
                            ))}

                            {/* MMA button with enhanced spacing */}
                            {(activeCategory === "All" || activeCategory === "MMA") && (
                                <button
                                    className="relative bg-[#0A1015] rounded-xl border border-[#1A2030] p-8 transition transform hover:scale-105 hover:border-[#FB4141]/50 shadow-xl hover:shadow-2xl overflow-hidden animate-slideUp min-h-[200px]"
                                    onClick={() => setShowMMAPopup(true)}
                                >
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-3">MMA</h3>
                                        <p className="text-gray-400 text-sm">Mixed Martial Arts</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FB4141]/10 to-transparent opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"></div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup rendering logic */}
            {showPopup && selectedLeague && (
                <>
                    {isChampionship ? (
                        <ChampionshipPopup onClose={() => setShowPopup(false)} selectedLeague={selectedLeague} />
                    ) : (
                        <BasketballPopup onClose={() => setShowPopup(false)} selectedLeague={selectedLeague} />
                    )}
                </>
            )}

            {showMMAPopup && <MMAPopup onClose={() => setShowMMAPopup(false)} />}
        </div>
    );
}
