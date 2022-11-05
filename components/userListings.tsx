import { Box, Collapse, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { describe } from "node:test"
import { useEffect, useState } from "react"
import { NewListingForm } from "./newListingForm"

export const UserListings = () => {
  const supabase = useSupabaseClient()
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data, error } = await supabase.from('listings').select('id, name, description')
      if (error) throw error
      setListings(data!)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  return <>
    <Box>
      <Heading my='2'>Your listings:</Heading>
      <NewListing />
      {listings.map(({ name, description }, key) => <Listing key={key} name={name} description={description} />)}
    </Box>
  </>
}

export const Listing = ({ name, description }: { name: string, description: string }) => {
  return <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg'>
    {name} - {description}
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