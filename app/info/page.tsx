import Navbar from "@/components/navbar";

export default function Info() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="content-container">
        <div className="intro-container">
          Info coming soon!
        </div>
      </div>
    </div>
  );
}
