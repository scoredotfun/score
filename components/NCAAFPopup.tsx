"use client";
import React, { useState, useEffect } from "react";
import NCAAFPopup from "./NCAAFPopup";
import BasketballPopup from "./BasketballPopup";

export default function PredictionsSection() {
    // State to control the visibility of the popups
    const [showNCAAFPopup, setShowNCAAFPopup] = useState<boolean>(false);
    const [showBasketballPopup, setShowBasketballPopup] = useState<boolean>(false);

    // State to track the active category filter
    const [activeCategory, setActiveCategory] = useState<string>("All");
    // State for game counts per category
    const [gameCounts, setGameCounts] = useState({
        All: 0,
        Soccer: 0,
        Basketball: 0,
        "American Football": 0,
        "Ice Hockey": 0,
        Boxing: 0,
        Baseball: 0,
        MMA: 0,
    });

    // Mapping from category label to the corresponding sport key in the Odds API
    const sportMapping: { [key: string]: string } = {
        Soccer: "soccer_epl", // Example: English Premier League
        Basketball: "basketball_nba",
        "American Football": "americanfootball_ncaaf",
        "Ice Hockey": "icehockey_nhl",
        Boxing: "boxing",
        Baseball: "baseball_mlb",
        MMA: "mma_mixed_martial_arts",
    };

    // Fetch game counts for each category (except "All") from the API
    useEffect(() => {
        async function fetchGameCounts() {
            const newCounts: any = {
                All: 0,
                Soccer: 0,
                Basketball: 0,
                "American Football": 0,
                "Ice Hockey": 0,
                Boxing: 0,
                Baseball: 0,
                MMA: 0,
            };
            const apiKey = "de4c83d36c8346d73f0498671be5d37e";
            for (const [label, sportKey] of Object.entries(sportMapping)) {
                const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h`;
                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    // Data should be an array of games; count its length
                    newCounts[label] = Array.isArray(data) ? data.length : 0;
                } catch (error) {
                    console.error(`Error fetching ${label}:`, error);
                    newCounts[label] = 0;
                }
            }
            // For "All", sum up all individual category counts
            newCounts["All"] = Object.keys(newCounts).reduce((sum, key) => {
                return key !== "All" ? sum + newCounts[key] : sum;
            }, 0);
            setGameCounts(newCounts);
        }
        fetchGameCounts();
    }, []);

    // List of filter categories (including "All")
    const categories = [
        { icon: "🎯", label: "All" },
        { icon: "⚽", label: "Soccer" },
        { icon: "🏀", label: "Basketball" },
        { icon: "🏈", label: "American Football" },
        { icon: "🏒", label: "Ice Hockey" },
        { icon: "🥊", label: "Boxing" },
        { icon: "⚾", label: "Baseball" },
        { icon: "🥋", label: "MMA" },
    ];

    return (
        <div
            id="predictions"
            className="min-h-screen bg-gradient-to-b from-[#04060e] to-[#0A0F1A] py-20"
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="space-grotesk text-6xl font-bold text-white mb-4 animate-fadeIn">
                        PREDICTIONS
                    </h2>
                    <p className="text-gray-400 text-lg animate-fadeIn delay-100">
                        Our AI-powered system analyzes millions of data points to deliver
                        accurate predictions across multiple sports.
                    </p>
                </div>

                {/* Sticky Filter Bar */}
                <div className="sticky top-0 z-20 bg-[#0A1015] bg-opacity-80 backdrop-blur-md py-4 mb-8 rounded-lg shadow-lg">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((btn, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(btn.label)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105 ${activeCategory === btn.label
                                    ? "border border-[#FB4141] text-[#FB4141] bg-[#FB4141]/10 hover:bg-[#FB4141]/20"
                                    : "border border-[#1A2030] text-gray-400 bg-[#1A2030] hover:border-[#FB4141]/30 hover:text-white"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span>{btn.icon}</span>
                                    <span>{btn.label}</span>
                                    <span className="px-2 py-0.5 text-xs rounded bg-[#0A1015]">
                                        {gameCounts[btn.label]}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Prediction Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* NCAAF Prediction Card (example card) */}
                    <button
                        className="relative bg-[#0A1015] rounded-xl border border-[#1A2030] p-6 transition transform hover:scale-105 hover:border-[#FB4141]/50 shadow-xl hover:shadow-2xl overflow-hidden animate-slideUp"
                        onClick={() => setShowNCAAFPopup(true)}
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">NCAAF</h3>
                            <p className="text-gray-400 text-sm">US College Football</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FB4141]/10 to-transparent opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"></div>
                    </button>

                    {/* Basketball Prediction Card */}
                    <button
                        className="relative bg-[#0A1015] rounded-xl border border-[#1A2030] p-6 transition transform hover:scale-105 hover:border-[#FB4141]/50 shadow-xl hover:shadow-2xl overflow-hidden animate-slideUp"
                        onClick={() => setShowBasketballPopup(true)}
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">Basketball</h3>
                            <p className="text-gray-400 text-sm">Select a league</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FB4141]/10 to-transparent opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"></div>
                    </button>

                    {/* Additional prediction cards for other sports can be added similarly */}
                </div>

                {/* Optional Call-to-Action Section */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Want More?</h3>
                    <p className="text-gray-400 mb-6">
                        Explore detailed analytics, upcoming match insights, and more personalized predictions.
                    </p>
                    <button className="px-8 py-3 rounded-full bg-[#FB4141] text-white font-semibold transition transform hover:scale-105">
                        Explore Analytics
                    </button>
                </div>
            </div>

            {/* Render the popups when requested */}
            {showNCAAFPopup && <NCAAFPopup onClose={() => setShowNCAAFPopup(false)} />}
            {showBasketballPopup && (
                <BasketballPopup onClose={() => setShowBasketballPopup(false)} />
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
