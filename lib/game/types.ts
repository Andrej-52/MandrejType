export type CharState = "correct" | "incorrect" | "pending" | "current";

export type GameStats = {
	correct: number;
	incorrect: number;
	accuracy: number;
	timeUsed: number;
	wpm: number;
};

export type RaceState = {
	targetText: string;
	userInput: string;
	startTime: number | null;
	endTime: number | null;
};

export type GameMode = "normal" | "code" | "quotes";