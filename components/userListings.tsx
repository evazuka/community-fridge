import { Box, Collapse, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { NewListingForm } from "./newListingForm"

export const UserListings = () => {
  return <>
    <Box>
      <Heading my='2'>Your listings:</Heading>
      <NewListing />
      <Listing />
      <Listing />
      <Listing />
    </Box>
  </>
}

export const Listing = () => {
  return <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg'>
    Listing
  </Box>
}

export const NewListing = () => {
  const { isOpen, onToggle } = useDisclosure()

  return <>
    <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg' as='button'>
      <Heading size='sm' onClick={onToggle}>+ Post new item</Heading>
    </Box>
    <Collapse in={isOpen} animateOpacity>
      <NewListingForm />
    </Collapse>
  </>
}

export default UserListings