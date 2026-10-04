import type { GameStats } from "@/lib/game/types";

type ProgressStatusProps = {
	stats: GameStats | null;
	onReset: () => void;
};

export default function ProgressStatus({ stats, onReset }: ProgressStatusProps) {
	return (
		<div className="flex items-center mb-4 space-x-8">
			<span className="text-2xl font-bold mb-4">{stats?.wpm || 0} WPM</span>
			<span className="text-lg mb-4">{stats?.accuracy.toFixed(2) || 0}% Accuracy</span>
			<span className="text-lg mb-4">{stats?.timeUsed.toFixed(0) || 0} seconds</span>
			<button
				className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
				onClick={onReset}
			>
				Reset
			</button>
		</div>
	);
}
