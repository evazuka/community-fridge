import { Flex } from "@chakra-ui/react"
import Link from "next/link"

type Props = {
  address: string
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
      <Link href='/'><strong>Community Fridge</strong></Link>
      <span>{address}</span>
    </Flex>
  )
}

export default NavBar