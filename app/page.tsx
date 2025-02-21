"use client";
import Head from "next/head";
import PredictionsSection from "../components/PredictionsSection";
import { Space_Grotesk } from "next/font/google";
import CyberpunkBackground from '../components/CyberpunkBackground';

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
              IT'S TIME TO
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
              height: %;
              overflow: hidden;
            }
            /* First pseudo-element (red offset) */
            .neon-glitch::before {
              left: 2px;
              color: #39ff14;
              text-shadow: -2px 0 red;
              clip: rect(0, 900px, 0, 0);
              animation: glitch-anim 2.5s infinite linear alternate-reverse;
            }
            /* Second pseudo-element (blue offset) */
            .neon-glitch::after {
              left: -2px;
              color: #39ff14;
              text-shadow: -2px 0 blue;
              clip: rect(0, 900px, 0, 0);
              animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
            }
            /* Glitch animation for first layer */
            @keyframes glitch-anim {
              0% {
                clip: rect(44px, 9999px, 56px, 0);
                transform: translate(0);
              }
              10% {
                clip: rect(12px, 9999px, 35px, 0);
                transform: translate(-5px, -5px);
              }
              20% {
                clip: rect(70px, 9999px, 85px, 0);
                transform: translate(5px, 5px);
              }
              30% {
                clip: rect(20px, 9999px, 40px, 0);
                transform: translate(-5px, 5px);
              }
              40% {
                clip: rect(50px, 9999px, 70px, 0);
                transform: translate(5px, -5px);
              }
              50% {
                clip: rect(44px, 9999px, 56px, 0);
                transform: translate(0);
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
              10% {
                clip: rect(60px, 9999px, 90px, 0);
                transform: translate(5px, -5px);
              }
              20% {
                clip: rect(95px, 9999px, 120px, 0);
                transform: translate(-5px, 5px);
              }
              30% {
                clip: rect(40px, 9999px, 70px, 0);
                transform: translate(5px, 5px);
              }
              40% {
                clip: rect(100px, 9999px, 130px, 0);
                transform: translate(-5px, -5px);
              }
              50% {
                clip: rect(85px, 9999px, 140px, 0);
                transform: translate(0);
              }
              100% {
                clip: rect(85px, 9999px, 140px, 0);
                transform: translate(0);
              }
            }
            .neon-glow {
              animation: neonFlicker 2s infinite;
            }
            @keyframes neonFlicker {
              0%,
              100% {
                text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14,
                  0 0 30px #39ff14;
              }
              50% {
                text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14,
                  0 0 15px #39ff14;
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
                      <span className="text-2xl">1</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Connect Wallet</h3>
                    <p className="text-gray-400 text-lg">
                      Link your Solana wallet to start interacting with the platform. Secure, fast, and seamless integration.
                    </p>
                  </div>
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">2</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Get Predictions</h3>
                    <p className="text-gray-400 text-lg">
                      Access AI-powered predictions across multiple sports. Real-time analysis and data-driven insights.
                    </p>
                  </div>
                  <div className="p-8 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-[#00bfff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl">3</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Place Bets</h3>
                    <p className="text-gray-400 text-lg">
                      Use $SCORE tokens to place bets and earn rewards. Smart contract-powered, transparent, and instant payouts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tokenomics */}
              <div className="text-center">
                <h2 className="text-7xl font-bold mb-8 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] via-white to-[#00BFFF] animate-gradient">
                    Tokenomics
                  </span>
                </h2>
                <div className="max-w-2xl mx-auto">
                  <div className="aspect-square relative w-[500px] mx-auto">
                    {/* Outer Decorative Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-[#00bfff]/20 animate-spin-slow" />
                    <div className="absolute inset-0 rounded-full border border-[#00bfff]/10" style={{
                      background: 'radial-gradient(circle at center, transparent 40%, rgba(0,191,255,0.05) 60%)',
                    }} />

                    {/* Tech Lines */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          transform: `rotate(${i * 45}deg)`,
                          background: 'linear-gradient(90deg, transparent 48%, rgba(0,191,255,0.2) 50%, transparent 52%)',
                        }}
                      />
                    ))}

                    {/* Segments */}
                    <div className="absolute inset-0">
                      {[
                        { percent: 30, label: "Community Rewards", color: "#00bfff", gradient: "from-[#00bfff]/40 to-[#00bfff]/10" },
                        { percent: 25, label: "Development", color: "#ff00ff", gradient: "from-[#ff00ff]/40 to-[#ff00ff]/10" },
                        { percent: 20, label: "Liquidity Pool", color: "#39FF14", gradient: "from-[#39FF14]/40 to-[#39FF14]/10" },
                        { percent: 15, label: "Team", color: "#FFD700", gradient: "from-[#FFD700]/40 to-[#FFD700]/10" },
                        { percent: 10, label: "Marketing", color: "#FF4500", gradient: "from-[#FF4500]/40 to-[#FF4500]/10" },
                      ].map((segment, index) => (
                        <div
                          key={segment.label}
                          className="absolute inset-0 transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            clipPath: `conic-gradient(from ${index * (360 / 5)}deg, ${segment.color} ${segment.percent}%, transparent ${segment.percent}%)`,
                          }}
                        >
                          <div className={`h-full w-full rounded-full bg-gradient-radial ${segment.gradient} hover:opacity-80`} />
                        </div>
                      ))}
                    </div>

                    {/* Center Circle */}
                    <div className="absolute inset-[30%] rounded-full bg-black/80 backdrop-blur-sm border-2 border-[#00bfff]/20 flex items-center justify-center">
                      <div className="relative">
                        <div className="text-3xl font-bold text-[#00bfff] animate-pulse">$SCORE</div>
                        <div className="absolute inset-0 blur-xl bg-[#00bfff]/20" />
                      </div>
                    </div>

                    {/* Hover Info Labels */}
                    <div className="absolute inset-0">
                      {[
                        { angle: 36, label: "Community Rewards", percent: "30%" },
                        { angle: 108, label: "Development", percent: "25%" },
                        { angle: 180, label: "Liquidity Pool", percent: "20%" },
                        { angle: 252, label: "Team", percent: "15%" },
                        { angle: 324, label: "Marketing", percent: "10%" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            transform: `rotate(${item.angle}deg) translateY(-240px) rotate(-${item.angle}deg)`,
                          }}
                        >
                          <div className="text-sm font-semibold text-white bg-black/50 px-3 py-1 rounded-full border border-[#00bfff]/20 backdrop-blur-sm">
                            {item.label} ({item.percent})
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Program Section */}
          <div className="relative z-10 container mx-auto mt-20">
            <h2 className="text-7xl font-bold mb-12 text-center tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] via-white to-[#00BFFF] animate-gradient">
                Referral Program
              </span>
            </h2>
            <div className="flex justify-center items-center">
              {/* First Box */}
              <div className="p-12 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm w-[460px] h-96">
                <h3 className="text-2xl font-bold mb-4 text-[#00BFFF]">Invite Friends</h3>
                <p className="text-gray-400">Share your unique referral link with friends and fellow traders</p>
              </div>

              {/* Connector 1 */}
              <div className="w-12 h-4 bg-[#00BFFF]/80 shadow-[0_0_15px_#00BFFF] border-[#00BFFF]/50"></div>

              {/* Second Box */}
              <div className="p-12 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm w-[460px] h-96">
                <h3 className="text-2xl font-bold mb-4 text-[#00BFFF]">They Join</h3>
                <p className="text-gray-400">When they sign up and make their first prediction</p>
              </div>

              {/* Connector 2 */}
              <div className="w-12 h-4 bg-[#00BFFF]/80 shadow-[0_0_15px_#00BFFF] border-[#00BFFF]/50"></div>

              {/* Third Box */}
              <div className="p-12 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm w-[460px] h-96">
                <h3 className="text-2xl font-bold mb-4 text-[#00BFFF]">Both Earn</h3>
                <p className="text-gray-400">Get 5% of their earnings and they get a welcome bonus</p>
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
                  <span role="img" aria-label="AI" className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#00BFFF]">AI Analysis</h3>
                <p className="text-gray-400">Advanced machine learning algorithms providing cutting-edge sports predictions</p>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-[#00bfff]/20 flex items-center justify-center mb-4">
                  <span role="img" aria-label="Chart" className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#00BFFF]">Real-time Stats</h3>
                <p className="text-gray-400">Live updates and comprehensive statistics across all major sports leagues</p>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-xl border border-[#00bfff]/20 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-[#00bfff]/20 flex items-center justify-center mb-4">
                  <span role="img" aria-label="Lock" className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#00BFFF]">Secure Platform</h3>
                <p className="text-gray-400">Enterprise-grade security with smart contract automation</p>
              </div>
            </div>
          </div>

          {/* Add the gradient animation */}
          <style jsx>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
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
