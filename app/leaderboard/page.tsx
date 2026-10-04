import Navbar from "@/components/navbar";
import Leaderboard from "@/components/leaderboard";
import Link from "next/link";
import type { GameMode } from "@/lib/game/types";

type LeaderboardPageProps = {
  searchParams: Promise<{ mode?: string }>;
};

function getMode(value: string | undefined): GameMode | "all" {
  return value === "normal" || value === "code" || value === "quotes"
    ? value
    : "all";
}

export default async function LeaderboardPage({ searchParams }: LeaderboardPageProps) {
  const params = await searchParams;
  const mode = getMode(params.mode);

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="flex flex-col items-center justiify-">
        <p className="text-3xl font-bold mb-5 ml-3 text-left text-[#671515]">Leaderboard</p>
        <div className="flex flex-row justify-center gap-4 mb-4">
          <Link className="rounded-xl bg-white/60 px-4 py-2 text-[#671515] hover:bg-white/80" href="/leaderboard?mode=all">
            All
          </Link>
          <Link className="rounded-xl bg-white/60 px-4 py-2 text-[#671515] hover:bg-white/80" href="/leaderboard?mode=normal">
            Normal
          </Link>
          <Link className="rounded-xl bg-white/60 px-4 py-2 text-[#671515] hover:bg-white/80" href="/leaderboard?mode=code">
            Code
          </Link>
          <Link className="rounded-xl bg-white/60 px-4 py-2 text-[#671515] hover:bg-white/80" href="/leaderboard?mode=quotes">
            Quotes
          </Link>
        </div>
        <Leaderboard mode={mode} />
        
      </div>
    </div>
  );
}
