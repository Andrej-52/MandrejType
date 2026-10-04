import Navbar from "@/components/navbar";
import Game from "@/components/game/game";

export default function CodeMode() {
	return (
		<div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
			<Navbar />
			<Game mode="code" />
		</div>
	);
}