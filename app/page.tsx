"use client";

import Navbar from "../components/navbar";
import { GameModeButton } from "../components/gameModeButton";
import { useState, useMemo, useEffect, useRef } from "react";
import { getText, getCharStates, randomNumber, calculateStats } from "./logic/logic";
import { createClient } from '@/lib/supabase/client'


export default function Home() {
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient()
  

  // forces a re-render every 500ms so WPM ticks up 
  const [, forceTick] = useState(0);


  useEffect(() => {
    setTargetText(getText(randomNumber(20, 100)));
  }, []);

  useEffect(() => {
    if (!startTime || endTime) return; // only tick while actively racing
    const interval = setInterval(() => forceTick((n) => n + 1), 500);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const charStates = useMemo(
    () => getCharStates(targetText, userInput),
    [targetText, userInput]
  );

  const stats = startTime
    ? calculateStats(targetText, userInput, startTime, endTime ?? Date.now())
    : null;

  async function handleChange(value: string) {
    if (!startTime) setStartTime(Date.now());
    setUserInput(value);
    if (value.length >= targetText.length) {
      setEndTime(Date.now());
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await saveScore(user.id, stats);
      }
    }
  }

  async function saveScore(userId: string, stats: any) {
    const { data, error } = await supabase.from('Scores').insert([
      {
        user_id: userId,
        wpm: stats?.wpm || 0,
        accuracy: stats?.accuracy || 0,
        time_used: stats?.timeUsed || 0
      }
    ]);
    
    if (error) {
      console.error('Error inserting score:', error);
    } else {
      console.log('Score inserted successfully:', data);
    }
  }

  function handleReset() {
    setTargetText(getText(randomNumber(20, 100)));
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    inputRef.current?.focus();
  }
  
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 space-x-8">
        <span className="text-2xl font-bold mb-4">{stats?.wpm || 0} WPM</span>
        <span className="text-lg mb-4">{stats?.accuracy.toFixed(2) || 0}% Accuracy</span>
        <span className="text-lg mb-4">{stats?.timeUsed.toFixed(0) || 0} seconds</span>
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleReset()}>
          Reset
        </button>
        </div>
        <div className="content-container">
        <div className="flex">
          <div className="intro-container" onClick={() => inputRef.current?.focus()}>

            <span className="text-black">
              {targetText.split("").map((char, i) => (
                <span key={i} className={
                  charStates[i] === "correct" ? "text-green-400" :
                  charStates[i] === "incorrect" ? "text-red-700" :
                  charStates[i] === "current" ? "border-l-2 text-yellow-500 animate-pulse" :
                  "text-gray-500"
                }>
                  {char}
                </span>
              ))}
            </span>
            <input
              ref={inputRef}
              className="absolute opacity-0 w-0 h-0 pointer-events-none" 
              value={userInput}
              onChange={(e) => handleChange(e.target.value)}
              disabled={endTime !== null}
              autoFocus
            />
          </div>
        </div>
        <div className="game-mode-container">
          <GameModeButton label="Normal" route="/" />
          <GameModeButton label="Quotes" route="/gameMode" />
          <GameModeButton label="Custom" route="/gameMode" />
        </div>
        </div>
      </div>
    </div>
  );
}