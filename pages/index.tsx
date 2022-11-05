import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { Heading, Container, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faHandshake } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/navbar'

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

  if (!session) return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />

  return (
    <>
      <NavBar />
      <Container>
        <VStack spacing='24px' mt='12px'>
          <Heading>Hello, {session.user.email}</Heading>
          <div>{data.map(x => JSON.stringify(x)).join('')}</div>
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <FontAwesomeIcon icon={faHandshake} />
        </VStack>
      </Container>
    </>
  )
}

export default Home