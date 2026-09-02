import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) next = '/'

    if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Exchange result:', { hasSession: !!data.session, error })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }


  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}