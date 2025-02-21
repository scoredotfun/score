"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
    interface Window {
        phantom?: {
            solana?: {
                isPhantom?: boolean;
                connect: () => Promise<{ publicKey: { toString: () => string } }>;
                disconnect: () => Promise<void>;
            };
        };
    }
}

export default function Header() {
    const [provider, setProvider] = useState<any>(null);
    const [walletKey, setWalletKey] = useState<string>("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const getProvider = () => {
                if ('phantom' in window) {
                    const provider = window.phantom?.solana;

                    if (provider?.isPhantom) {
                        return provider;
                    }
                }
                window.open('https://phantom.app/', '_blank');
            };

            setProvider(getProvider());
        }
    }, []);

    const connectWallet = async () => {
        try {
            const resp = await provider.connect();
            const publicKey = resp.publicKey.toString();
            setWalletKey(publicKey);
            localStorage.setItem('walletKey', publicKey);
        } catch (err) {
            console.error("Connection failed:", err);
        }
    };

    const disconnectWallet = async () => {
        try {
            await provider.disconnect();
            setWalletKey("");
            localStorage.removeItem('walletKey');
        } catch (err) {
            console.error("Disconnection failed:", err);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Left side: Logo */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <h1
                                className="space-grotesk text-4xl font-bold"
                                style={{ color: "#39FF14", textShadow: "0 0 4.5px #39FF14" }}
                            >
                                $SCORE
                            </h1>
                            <div className="absolute inset-0 bg-[#FB4141] opacity-20 blur-xl -z-10"></div>
                        </div>
                    </div>

                    {/* Right side: Navigation */}
                    <nav className="flex items-center gap-8">
                        {/* X (Twitter) Link */}
                        <button
                            onClick={() => window.open('https://x.com/scoreonsol', '_blank')}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img
                                src="/images/x.jpg"
                                alt="X (Twitter)"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </button>

                        {/* Predictions link */}
                        <a
                            href="#predictions"
                            className="text-gray-400 hover:text-white transition-colors relative group px-4 py-2"
                        >
                            Predictions
                        </a>

                        {/* How It Works/Distribution link */}
                        <a
                            href="#how-it-works"
                            className="text-gray-400 hover:text-white transition-colors relative group px-4 py-2"
                        >
                            How It Works/Distribution
                        </a>

                        {/* Connect/Disconnect Wallet button */}
                        <button
                            onClick={walletKey ? disconnectWallet : connectWallet}
                            className="group relative px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium"
                            type="button"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B79F8] to-[#AB9FF2] rounded-lg"></div>
                            <div className="absolute inset-0 bg-[#8B79F8] opacity-0 group-hover:opacity-20 blur-lg transition-opacity rounded-lg"></div>
                            <div className="relative flex items-center gap-2 text-white">
                                <img
                                    src="https://i.imgur.com/S1wzFws.png"
                                    alt=""
                                    className="w-4 h-4 object-contain"
                                />
                                {walletKey
                                    ? `DISCONNECT (${walletKey.slice(0, 4)}...${walletKey.slice(-4)})`
                                    : 'Connect Wallet'}
                            </div>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
