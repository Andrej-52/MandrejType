"use client";

import Navbar from "../components/navbar";
import Game from "@/components/game/game";


export default function Home() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <Navbar />
      <Game mode="normal" />
    </div>
  );
}