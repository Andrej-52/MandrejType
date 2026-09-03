import { WORDS } from "@/lib/words";

export type CharState = "correct" | "incorrect" | "pending" | "current";

export function getCharStates(targetText: string, userInput: string): CharState[] {
    return targetText.split("").map((char, i) => {
        if (i > userInput.length) return "pending";
        if (i == userInput.length) return "current";
        return userInput[i] === char ? "correct" : "incorrect";
    });
}

export function calculateStats(targetText: string, userInput: string, startTime: number, endTime: number) {
    const states = getCharStates(targetText, userInput);
    const correct = states.filter((s) => s === "correct").length;
    const incorrect = states.filter((s) => s === "incorrect").length;
    const totalTyped = correct + incorrect;
    const accuracy = totalTyped > 0 ? (correct / totalTyped) * 100 : 0;

    const timeUsed = (endTime - startTime) / 1000;
    const minutes = timeUsed / 60;
    const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;

    return { correct, incorrect, accuracy, timeUsed, wpm };
}

export function getText(length: number): string {
    return WORDS.sort(() => Math.random() - 0.5).slice(0, length).join(" "); // Shuffle the words
};
export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}