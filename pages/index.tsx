import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { Heading, Container, VStack, Flex, Box, Spacer, useRadio, Text } from '@chakra-ui/react'
import NavBar from '../components/navbar'
import { useRouter } from 'next/router'
import { getUserName } from '../helpers'

const Home = () => {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
  const [data, setData] = useState<any[]>([])
  const [hoverL, setHoverL] = useState(false)
  const [hoverR, setHoverR] = useState(false)

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
      <NavBar address='' />
      <Container>
        <VStack spacing='24px' mt='12px'>
          <Heading>Hello, <span style={{ color: '#009DE0' }}>{getUserName(session.user.email ?? '')}</span></Heading>
          <Text fontSize='xl'>take what you need, leave what you can</Text>
          <Flex>
            <Box
              onMouseEnter={() => setHoverL(true)}
              onMouseLeave={() => setHoverL(false)}
              m='4' p='16' className='amazing' textAlign='center' cursor='pointer' onClick={() => router.push('/share')}>
              <FontAwesomeIcon icon={faHandHoldingHeart} size="6x" beat={hoverL} color="#383838" />
              <Heading size='md' paddingTop='5'>Share</Heading>
            </Box>
            <Spacer />
            <Box
              onMouseEnter={() => setHoverR(true)}
              onMouseLeave={() => setHoverR(false)}
              m='4' p='16' className='amazing' textAlign='center' cursor='pointer' onClick={() => router.push('/take')}>
              <FontAwesomeIcon icon={faHandshake} size="6x" beat={hoverR} color="#383838" />
              <Heading size='md' paddingTop='5'>Take</Heading>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </>
  )
}

export default Home