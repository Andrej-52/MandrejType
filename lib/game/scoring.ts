import type { CharState, GameStats, RaceState } from "@/lib/game/types";

export function getCharStates(targetText: string, userInput: string): CharState[] {
	return targetText.split("").map((char, index) => {
		if (index > userInput.length) return "pending";
		if (index === userInput.length) return "current";
		return userInput[index] === char ? "correct" : "incorrect";
	});
}

export function calculateStats(
	race: RaceState,
	now: number = Date.now(),
): GameStats {
	const states = getCharStates(race.targetText, race.userInput);
	const correct = states.filter((state) => state === "correct").length;
	const incorrect = states.filter((state) => state === "incorrect").length;
	const totalTyped = correct + incorrect;
	const accuracy = totalTyped > 0 ? (correct / totalTyped) * 100 : 0;
	const endTime = race.endTime ?? now;
	const timeUsed = race.startTime
		? Math.round((endTime - race.startTime) / 1000)
		: 0;
	const minutes = timeUsed / 60;
	const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;

	return { correct, incorrect, accuracy, timeUsed, wpm };
}