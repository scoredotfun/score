import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "SCORE | Solana-Powered Sports Betting & AI Predictions",
  description: "Your description here",
  icons: {
    icon: '/favicon.ico',  // /public/favicon.ico
  }
};

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}