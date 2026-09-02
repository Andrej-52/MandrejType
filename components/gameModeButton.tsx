"use client";

import "./gameModeButton.css";
import Link from "next/link";

interface GameModeButtonProps {
  label: string;
  route: string;
}

export function GameModeButton({ label, route }: GameModeButtonProps) {

  return (
    <Link href={route} className="game-mode-button">
      <span className="game-mode-button-text">
        {label}
      </span>
    </Link>
  );
}