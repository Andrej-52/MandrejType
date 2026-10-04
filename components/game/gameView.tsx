import type { RefObject } from "react";
import { GameModeButton } from "@/components/gameModeButton";
import ProgressStatus from "@/components/game/progressStatus";
import TypingArea from "@/components/game/typingArea";
import type { CharState, GameMode, GameStats } from "@/lib/game/types";

type GameViewProps = {
	mode: GameMode;
	stats: GameStats | null;
	targetText: string;
	userInput: string;
	charStates: CharState[];
	inputRef: RefObject<HTMLInputElement | null>;
	onReset: () => void;
	onFocus: () => void;
	onChange: (value: string) => void;
	disabled: boolean;
	showResult: boolean;
};

export default function GameView({
	mode,
	stats,
	targetText,
	userInput,
	charStates,
	inputRef,
	onReset,
	onFocus,
	onChange,
	disabled,
	showResult,
}: GameViewProps) {
	return (
		<div className="flex flex-col items-center justify-center">
			<ProgressStatus stats={stats} onReset={onReset} />
			<div className="content-container">
				<TypingArea
					mode={mode}
					targetText={targetText}
					userInput={userInput}
					charStates={charStates}
					inputRef={inputRef}
					onFocus={onFocus}
					onChange={onChange}
					disabled={disabled}
				/>
				<div className="game-mode-container">
					<GameModeButton label="Normal" route="/" />
					<GameModeButton label="Code" route="/gameMode/codeMode" />
					<GameModeButton label="Quotes" route="/gameMode/quotesMode" />
				</div>
			</div>
			{showResult && stats && (
				<div className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-black/20">
					<div className=" text-lg flext items-center justify.center rounded-4xl w-2xl ml-24 bg-[oklch(94.1%_0.03_12.58)] h-100 p-8 text-center shadow-2xl">
						<p className="text-[#671515] font-bold text-4xl mb-15">RACE FINISHED</p>
						<p className="font-bold"> {stats.wpm} WPM</p>
						<p className=" font-bold">{stats.accuracy.toFixed(2)}% Accuracy</p>
						<p className=" font-bold mb-5">{stats.timeUsed} seconds</p>
						<button
							className="mt-6 rounded-2xl bg-[#E0457B] px-4 py-2 font-bold text-white hover:bg-[#C93368]"
							onClick={onReset}
						>
							Try again
						</button>
					</div>
				</div>
				
			)}
		</div>
	);
}