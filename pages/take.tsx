import { Container } from "@chakra-ui/react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import NavBar from "../components/navbar"
import UserListings from "../components/userListings"

const Take = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  if (!session) return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />

  return (
    <>
      <NavBar />
      <Container>
        <div>Hello, {session.user.email}</div>
        <UserListings />
      </Container>
    </>
  )
}

export default Take