import { Box, Collapse, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { NewListingForm } from "./newListingForm"

export const UserListings = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [refreshToken, refresh] = useState(0)
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    getData()
  }, [refreshToken])

  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, name, description')
        .eq('seller', user?.id)
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
      <NewListing onInsert={() => refresh(i => i + 1)} />
      {listings.map(({ name, description }, key) => <Listing key={key} name={name} description={description} />)}
    </Box>
  </>
}

export const Listing = ({ name, description }: { name: string, description: string }) => {
  return <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg'>
    {name} - {description}
  </Box>
}

type Props = {
  onInsert: () => void
}

export const NewListing = ({ onInsert }: Props) => {
  const { isOpen, onToggle } = useDisclosure()

  const handleInsert = () => {
    onToggle()
    onInsert()
  }

  return <>
    <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg' as='button'>
      <Heading size='sm' onClick={onToggle}>+ Post new item</Heading>
    </Box>
    <Collapse in={isOpen} animateOpacity>
      <NewListingForm onInsert={handleInsert} />
    </Collapse>
  </>
}

export default UserListings