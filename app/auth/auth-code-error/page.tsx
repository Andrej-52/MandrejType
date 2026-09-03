export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Sign-in failed</h1>
      <p className="text-muted-foreground">
        Something went wrong while signing you in. Please try again.
      </p>
      <a href="/login" className="underline">
        Back to login
      </a>
    </div>
  )
}