// app/referrals/page.tsx
export default function ReferralsPage() {
    return (
        <main
            className="min-h-screen bg-[#050910] flex flex-col items-center justify-center py-20 relative"
            style={{
                backgroundImage: 'url("https://i.imgur.com/0vgMMpt.png")',
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4 relative">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="space-grotesk text-6xl font-bold text-white mb-6">
                        REFERRALS
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Share the winning strategy with friends. Earn rewards for every successful referral and help others make smarter bets.
                    </p>
                </div>
                {/* Insert your referral steps and buttons here */}
            </div>
        </main>
    );
}
