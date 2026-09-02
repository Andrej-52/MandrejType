'use client'
import { createClient } from '@/lib/supabase/client'

export default function LoginButton() {
  const supabase = createClient()

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/profile`,
      },
    })
  }

  return (
    <button 
      onClick={signInWithGoogle}
      className="border border-[#671515] hover:bg-[#671515] hover:text-white text-[#671515] font-bold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  )
}