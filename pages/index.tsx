import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data, error } = await supabase.from('testtable').select('*')
      if (error) {
        throw error
      }
      setData(data)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <>
          <div>Hello, {session.user.email}</div>
          <div>{data.map(x => JSON.stringify(x)).join('')}</div>
        </>
      )}
    </div>
  )
}

export default Home