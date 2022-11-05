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
      borderBottom="1px solid rgb(226, 232, 240)"
      boxShadow='0px 0px 40px rgba(0, 0, 0, 0.10)'
      {...props}
    >
      <strong>Community Fridge</strong>
      <span>📍Otakaari 24, 02150 Espoo</span>
    </Flex>
  )
}

export default NavBar