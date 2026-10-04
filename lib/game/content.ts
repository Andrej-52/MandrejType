import { WORDS } from "@/lib/words";
import { codeSnippets } from "@/lib/codeSnippets";
import { quotes } from "@/lib/quotes";
import type { GameMode } from "@/lib/game/types";


function randomItem<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)];
}

function getNormalPrompt(): string {
	const length = Math.floor(Math.random() * 81) + 20;
	return WORDS.slice().sort(() => Math.random() - 0.5).slice(0, length).join(" ");
}

export function getPrompt(mode: GameMode): string {
	switch (mode) {
		case "code":
			return randomItem(codeSnippets);
		case "quotes":
			return randomItem(quotes);
		case "normal":
		default:
			return getNormalPrompt();
	}
}