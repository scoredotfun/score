"use client";
import Head from "next/head";
import PredictionsSection from "../components/PredictionsSection";
import { Space_Grotesk } from "next/font/google";
import CyberpunkBackground from "../components/CyberpunkBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>$SCORE | AI Sports Betting Predictions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={`${spaceGrotesk.className} overflow-y-auto`}>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/images/bgdn.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-50 z-10"></div>

          {/* Content */}
          <div className="relative z-20 text-center px-4">
            <h2
              className="text-4xl font-bold uppercase mb-2"
              style={{ color: "#39FF14" }}
            >
              IT&apos;S TIME TO
            </h2>
            <h1 className="text-9xl font-bold mb-4 neon-glitch">$SCORE</h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#39FF14" }}
            >
              The First Solana-Sports Betting Platform. Get winning predictions,
              real-time odds analysis, and smart betting strategies delivered
              straight to you.
            </p>
          </div>

          {/* CSS Animations for improved glitch & neon flicker effects */}
          <style jsx>{`
            .neon-glitch {
              position: relative;
              color: #39ff14;
              /* Base neon glow */
              text-shadow: 0 0 4.5px #39ff14;
            }
            /* Create two layers for the glitch effect */
            .neon-glitch::before,
            .neon-glitch::after {
              content: "$SCORE";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
            /* First pseudo-element (red offset) */
            .neon-glitch::before {
              left: 2px;
              color: #39ff14;
              text-shadow: -2px 0 red;
              clip: rect(0, 900px, 0, 0);
              /* Run the glitch continuously */
              animation: glitch-anim 1.5s infinite linear;
            }
            /* Second pseudo-element (blue offset) */
            .neon-glitch::after {
              left: -2px;
              color: #39ff14;
              text-shadow: -2px 0 blue;
              clip: rect(0, 900px, 0, 0);
              animation: glitch-anim-2 1.5s infinite linear;
            }
            /* Glitch animation for first layer */
            @keyframes glitch-anim {
              0% {
                clip: rect(44px, 9999px, 56px, 0);
                transform: translate(0);
              }
              20% {
                clip: rect(12px, 9999px, 35px, 0);
                transform: translate(-5px, -5px);
              }
              40% {
                clip: rect(70px, 9999px, 85px, 0);
                transform: translate(5px, 5px);
              }
              60% {
                clip: rect(20px, 9999px, 40px, 0);
                transform: translate(-5px, 5px);
              }
              80% {
                clip: rect(50px, 9999px, 70px, 0);
                transform: translate(5px, -5px);
              }
              100% {
                clip: rect(44px, 9999px, 56px, 0);
                transform: translate(0);
              }
            }
            /* Glitch animation for second layer */
            @keyframes glitch-anim-2 {
              0% {
                clip: rect(85px, 9999px, 140px, 0);
                transform: translate(0);
              }
              20% {
                clip: rect(60px, 9999px, 90px, 0);
                transform: translate(5px, -5px);
              }
              40% {
                clip: rect(95px, 9999px, 120px, 0);
                transform: translate(-5px, 5px);
              }
              60% {
                clip: rect(40px, 9999px, 70px, 0);
                transform: translate(5px, 5px);
              }
              80% {
                clip: rect(100px, 9999px, 130px, 0);
                transform: translate(-5px, -5px);
              }
              100% {
                clip: rect(85px, 9999px, 140px, 0);
                transform: translate(0);
              }
            }
          `}</style>
        </section>

        {/* Predictions Section with ID for in-page scrolling */}
        <section id="predictions">
          <PredictionsSection />
        </section>

        {/* How It Works & Tokenomics Section */}
        <section
          id="how-it-works"
          className="relative min-h-[150vh] flex flex-col items-center justify-start bg-black py-32 px-4 gap-20"
        >
          <CyberpunkBackground />
          <div className="relative z-10 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* How It Works */}
              <div className="text-center">
                <h2 className="text-7xl font-bold mb-12 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] via-white to-[#00BFFF] animate-gradient">
                    How It Works
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-8">
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl text-white">1</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Connect Wallet</h3>
                    <p className="text-white text-lg">
                      Link your Solana wallet to start interacting with the platform.
                      Secure, fast, and seamless integration.
                    </p>
                  </div>
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl text-white">2</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Automation</h3>
                    <ul className="list-disc list-inside text-white text-lg text-left space-y-2">
                      <li>Bets are confirmed and locked ~ 30 minutes prior to game start</li>
                      <li>Smart contract collects & distributes accordingly</li>
                    </ul>
                  </div>
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl text-white">3</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      What&apos;s with the large dev holding?
                    </h3>
                    <ul className="list-disc list-inside text-white text-lg text-left space-y-2">
                      <li>10% early on limits individual holders, aligning with smart contract capacity, ensuring operational integrity.  </li>
                      <li>Secures majority funds (5% locked, 5% automated) while maintaining adequate liquidity and holder distribution after the initial post-launch phase.  </li>
                      <li>5% holding operated by smart contract for payouts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tokenomics */}
              <div className="text-center">
                <h2 className="text-7xl font-bold mb-12 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] via-white to-[#00BFFF] animate-gradient">
                    Tokenomics
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-8">
                  {/* Dev Allocation */}
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-24 h-24 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-5xl font-bold text-white">10%</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Dev Allocation</h3>
                    <ul className="text-white text-xl list-none space-y-2">
                      <li><span className="text-3xl font-bold text-[#00BFFF]">5%</span> - Locked Development Wallet</li>
                      <li><span className="text-3xl font-bold text-[#00BFFF]">5%</span> - Smart Contract Automated Betting Pool</li>
                    </ul>
                    <p className="text-white text-lg mt-4">
                      We&apos;ll split the 10%—5% locked for development, 5% to a smart contract—once we have enough holders and liquidity to guarantee the system runs smoothly. Too few participants or thin liquidity early on risks overloading the smart contract or skewing payouts, so we wait until there&apos;s a strong base to support on-chain operations and keep the platform stable.
                    </p>
                  </div>

                  {/* Market Allocation */}
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-24 h-24 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-5xl font-bold text-white">90%</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Market Allocation & Dynamics</h3>

                  </div>

                  {/* Grid for Total Supply and Fair Launch */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Total Supply */}
                    <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl text-white">💎</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Total Supply</h3>
                      <p className="text-white">
                        <span className="text-2xl font-bold text-[#00BFFF]">1,000,000,000</span>
                        <br />
                        <span className="text-lg">tokens initial supply</span>
                      </p>
                    </div>

                    {/* Fair Launch */}
                    <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl text-white">🚀</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Fair Launch</h3>
                      <p className="text-white text-lg">
                        <span className="text-2xl font-bold text-[#00BFFF]">100%</span> fair launch with no pre-sale
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="relative z-10 container mx-auto mt-20">
            <h2 className="text-7xl font-bold mb-12 text-center tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] via-white to-[#00BFFF] animate-gradient">
                Platform Features
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-[#00bfff]/20 flex items-center justify-center mb-4">
                  <span role="img" aria-label="AI" className="text-2xl">
                    🤖
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#00BFFF]">
                  On-Chain Betting
                </h3>
                <p className="text-gray-400">
                  The first platform combining on-chain trading with sports betting
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-[#00bfff]/20 flex items-center justify-center mb-4">
                  <span role="img" aria-label="Chart" className="text-2xl">
                    📊
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#00BFFF]">
                  Real-time Stats
                </h3>
                <p className="text-gray-400">
                  Live updates and comprehensive statistics across all major sports leagues
                </p>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-[#00bfff]/20 flex items-center justify-center mb-4">
                  <span role="img" aria-label="Lock" className="text-2xl">
                    🔒
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#00BFFF]">
                  Secure Platform
                </h3>
                <p className="text-gray-400">
                  Enterprise-grade security with smart contract automation
                </p>
              </div>
            </div>
          </div>

          {/* Add the gradient animation */}
          <style jsx>{`
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
          `}</style>
        </section>
      </div>
    </>
  );
}
