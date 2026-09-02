import Navbar from "@/components/navbar";
import SpeechBubble from "@/components/speechBubble";
import {GameModeButton} from "@/components/gameModeButton";



export default function Home() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="content-container">
        <div className="flex">
          <div className="intro-container">
            <div className="flex text-2xl font-bold">
              Welcome to Mandrej!
            </div>
            <div className="flex text-base">
              This is a type racing game! Select mode to start playing.
            </div>
          </div>
        </div>
        <div className="game-mode-container">
          <GameModeButton label="Normal" route="/" />
          <GameModeButton label="Quotes" route="/" />
          <GameModeButton label="Custom" route="/" />
        </div>
      </div>
    </div>
  );
}
