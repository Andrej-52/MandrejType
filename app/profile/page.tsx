import Navbar from '@/components/navbar'
import { CircleUser } from "lucide-react";
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './logoutButton'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  
  if (!user) {
    redirect('/login')
  }

  return (
  <div className="bg-[url('/bg.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
    <Navbar />
    <div className="content-container">
      <div className="intro-container">
      <CircleUser size={80} /> 
        <p className="text-lg font-semibold"> {user.user_metadata?.name ?? 'N/A'} </p>
        <p className="text-sm font-semibold ">Email: {user.email}</p>
        <LogoutButton />
      </div>
    </div>
  </div>
  )

}
