import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { UploadImage } from "../components/uploadImage"

const Share = () => {
    const session = useSession()
    const supabase = useSupabaseClient()

    if (!session) return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
          {!session ? (
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          ) : (
            <>
              <div>Hello, {session.user.email}</div>
              <div><UploadImage url={null} /></div>
            </>
          )}
        </div>
      )
}

export default Share