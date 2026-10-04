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
		</div>
	);
}