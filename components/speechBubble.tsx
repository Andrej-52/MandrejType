import "./speechBubble.css";

export default function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
      <div className="speech-bubble">
        {children}
      </div>
  );
}