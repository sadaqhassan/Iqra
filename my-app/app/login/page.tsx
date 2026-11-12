import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const instant = false

export default async function LoginPage() {
  const session = await auth()

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle>
            {session?.user ? "You are signed in" : "Welcome to Iqra"}
          </CardTitle>
          <CardDescription>
            {session?.user
              ? `Signed in as ${session.user.email ?? session.user.name ?? "Google user"}`
              : "Sign in securely with your Google account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session?.user?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt=""
              className="mx-auto size-16 rounded-full"
            />
          )}
        </CardContent>
        <CardFooter className="pt-0">
          {session?.user ? (
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/login" })
              }}
              className="w-full"
            >
              <Button type="submit" variant="outline" className="w-full">
                Sign out
              </Button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/login" })
              }}
              className="w-full"
            >
              <Button type="submit" className="w-full">
                Continue with Google
              </Button>
            </form>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}
