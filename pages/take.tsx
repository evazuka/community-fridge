import { Container } from "@chakra-ui/react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import NavBar from "../components/navbar"
import AllListings from "../components/allListings"

const Take = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  if (!session) return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />

  return (
    <>
      <NavBar address="Arkadiankatu 3-6 3rd floor, 00100 Helsinki" />
      <Container>
        <AllListings />
      </Container>
    </>
  )
}

export default Take