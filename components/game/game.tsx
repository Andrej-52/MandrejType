"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GameView from "@/components/game/gameView";
import { calculateStats, getCharStates } from "@/lib/game/scoring";
import { createRace, handleKeystroke } from "@/lib/game/engine";
import { getPrompt } from "@/lib/game/content";
import type { GameMode, GameStats, RaceState } from "@/lib/game/types";
import { createClient } from "@/lib/supabase/client";

type GameProps = {
	mode: GameMode;
};

export default function Game({ mode }: GameProps) {
	const [race, setRace] = useState<RaceState>(() => createRace(""));
	const inputRef = useRef<HTMLInputElement>(null);
	const supabase = createClient();
	const [, forceTick] = useState(0);

	function createModeRace() {
		return createRace(getPrompt(mode));
	}

	useEffect(() => {
		setRace(createModeRace());
	}, [mode]);

	useEffect(() => {
		if (race.startTime === null || race.endTime !== null) return;
		const interval = setInterval(() => forceTick((value) => value + 1), 500);
		return () => clearInterval(interval);
	}, [race.startTime, race.endTime]);

	const charStates = useMemo(
		() => getCharStates(race.targetText, race.userInput),
		[race.targetText, race.userInput],
	);
	const stats = race.startTime !== null ? calculateStats(race) : null;

	async function handleChange(value: string) {
		const nextRace = handleKeystroke(race, value);
		setRace(nextRace);
		if (nextRace.endTime !== null && race.endTime === null) {
			const { data: { user } } = await supabase.auth.getUser();
			if (user) await saveScore(user.id, calculateStats(nextRace));
		}
	}

	async function saveScore(userId: string, scoreStats: GameStats) {
		const { error } = await supabase.from("Scores").insert([
			{
				user_id: userId,
				wpm: scoreStats.wpm,
				accuracy: scoreStats.accuracy,
				time_used: scoreStats.timeUsed,
        mode: mode,
			},
		]);
		if (error) console.error("Error inserting score:", error);
	}

	function handleReset() {
		setRace(createModeRace());
		inputRef.current?.focus();
	}

	return (
		<GameView
			mode={mode}
			stats={stats}
			targetText={race.targetText}
			userInput={race.userInput}
			charStates={charStates}
			inputRef={inputRef}
			onReset={handleReset}
			onFocus={() => inputRef.current?.focus()}
			onChange={handleChange}
			disabled={race.endTime !== null}
		/>
	);
}