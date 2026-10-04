import type { RefObject } from "react";
import type { CharState, GameMode } from "@/lib/game/types";

type TypingAreaProps = {
	mode: GameMode;
	targetText: string;
	userInput: string;
	charStates: CharState[];
	inputRef: RefObject<HTMLInputElement | null>;
	onFocus: () => void;
	onChange: (value: string) => void;
	disabled: boolean;
};

export default function TypingArea({
	mode,
	targetText,
	userInput,
	charStates,
	inputRef,
	onFocus,
	onChange,
	disabled,
}: TypingAreaProps) {
	return (
		<div className="flex">
			<div
				className={`intro-container ${mode === "code" ? "code-intro-container" : ""}`}
				onClick={onFocus}
			>
				<span className="text-black whitespace-pre-wrap">
					{targetText.split("").map((char, i) => (
						<span
							key={i}
							className={
								charStates[i] === "correct"
									? "text-green-400"
									: charStates[i] === "incorrect"
										? "text-red-700"
										: charStates[i] === "current"
											? "border-l-2 text-yellow-500 animate-pulse"
											: "text-gray-500"
							}
						>
							{char}
						</span>
					))}
				</span>
				<input
					ref={inputRef}
					className="absolute opacity-0 w-0 h-0 pointer-events-none"
					value={userInput}
					onChange={(event) => onChange(event.target.value)}
					disabled={disabled}
					autoFocus
				/>
			</div>
		</div>
	);
}
