import { Flex } from "@chakra-ui/react"

const NavBar = ({ ...props }) => {
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
      borderBottom="1px solid"
      {...props}
    >
      <strong>Community Fridge</strong>
    </Flex>
  )
}

export default NavBar