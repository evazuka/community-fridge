import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { Heading, Container, VStack, Flex, Box, Spacer, useRadio } from '@chakra-ui/react'
import NavBar from '../components/navbar'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
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
          <Flex>
            <Box m='4' p='16' borderWidth='1px' borderRadius='lg' cursor='pointer' onClick={() => router.push('/share')}>
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              <Heading size='sm'>Share</Heading>
            </Box>
            <Spacer />
            <Box m='4' p='16' borderWidth='1px' borderRadius='lg' cursor='pointer' onClick={() => router.push('/take')}>
              <FontAwesomeIcon icon={faHandshake} />
              <Heading size='sm'>Take</Heading>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </>
  )
}

export default Home