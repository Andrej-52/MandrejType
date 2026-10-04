import type { RaceState } from "@/lib/game/types";

export function createRace(targetText: string): RaceState {
	return {
		targetText,
		userInput: "",
		startTime: null,
		endTime: null,
	};
}

export function startRace(race: RaceState, now: number = Date.now()): RaceState {
	if (race.startTime !== null) return race;
	return { ...race, startTime: now };
}

export function finishRace(race: RaceState, now: number = Date.now()): RaceState {
	if (race.endTime !== null) return race;
	return { ...race, endTime: now };
}

export function handleKeystroke(
	race: RaceState,
	userInput: string,
	now: number = Date.now(),
): RaceState {
	const startedRace = startRace(race, now);
	const nextRace = { ...startedRace, userInput };
	return userInput.length >= race.targetText.length
		? finishRace(nextRace, now)
		: nextRace;
}
