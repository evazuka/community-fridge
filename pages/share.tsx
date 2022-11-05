import { Container, Text } from "@chakra-ui/react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useEffect } from "react"
import NavBar from "../components/navbar"
import { UploadImage } from "../components/uploadImage"
import UserListings from "../components/userListings"

const Share = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  if (!session) return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />

  return (
    <>
      <NavBar address="Otakaari 24, 02150 Espoo" />
      <Container>
        <UserListings />
      </Container>
    </>
  )
}

export default Share