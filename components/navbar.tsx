import { Flex, Heading } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

type Props = {
  address: string | null
}

const NavBar = ({ address }: Props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      borderBottom="1px solid rgb(226, 232, 240)"
      boxShadow='0px 0px 40px rgba(0, 0, 0, 0.10)'
    >
      <Link href="/"><Heading size='md'><span style={{ color: '#009DE0' }}>Free</span>dge.</Heading></Link>
      {address && <span><FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '4px', width: '20px' }} />{address}</span>}
    </Flex>
  )
}

export default NavBar