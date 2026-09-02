'use client'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const supabase = createClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <button
      onClick={signOut}
      className="border border-[#671515] hover:bg-[#671515] hover:text-white text-[#671515] font-bold mt-4 py-2 px-4 rounded"
    >
      Sign out
    </button>
  )
}