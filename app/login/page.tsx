import LoginButton from './loginButton'
import Navbar from '@/components/navbar'
import { CircleUser } from "lucide-react";

export default function LoginPage() {
  return (
  <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
    <Navbar />
    <div className="content-container">
      <div className="intro-container">
      <CircleUser size={80} /> 
      <LoginButton />
      </div>
    </div>
  </div>
  )

}
