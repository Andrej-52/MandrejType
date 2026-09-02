import Navbar from "@/components/navbar";
import Leaderboard from "@/components/leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <Navbar />
          <Leaderboard />
    </div>
  );
}
