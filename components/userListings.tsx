import { Box, Collapse, Grid, GridItem, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useCallback, useEffect, useState } from "react"
import { NewListingForm } from "./newListingForm"
import { Image } from './image'

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
        .select('id, name, description, imageUrl')
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
      {listings.map(({ name, description, imageUrl }, key) => <Listing key={key} name={name} description={description} imageUrl={imageUrl} />)}
      <NewListing onInsert={() => refresh(i => i + 1)} />
    </Box>
  </>
}

export const Listing = ({ name, description, imageUrl }: { name: string, description: string, imageUrl: string | undefined }) => {

  return <>
    <Box my='4' px='2' py='2' className="card">
      <Grid
        templateAreas={`"header image"
                  "description image"`}
        gridTemplateRows='repeat(2, 1fr)'
        gridTemplateColumns='1fr minmax(100px, 100px)'
        h='100px'
      >
        <GridItem area={'header'}>
          <Heading size='md'>{name}</Heading>
        </GridItem>
        <GridItem area={'description'} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {description}
        </GridItem>
        <GridItem area={'image'} width='100px'>
          {imageUrl
            ? <Image url={imageUrl} onDownload={() => {}} />
            : <img
              src='https://via.placeholder.com/100?text=?'
              alt="image"
              className="image"
              style={{ height: 100, width: 100 }}
            />}
        </GridItem>
      </Grid>
    </Box>
  </>
}

type Props = {
  onInsert: () => void
}

export const NewListing = ({ onInsert }: Props) => {
  const { isOpen, onToggle } = useDisclosure()

  const handleInsert = useCallback(() => {
    onToggle()
    onInsert()
  }, [isOpen, onToggle, onInsert])

  return <>
    <Box px='16' py='4' borderWidth='1px' borderRadius='lg' as='button' background='#009DE0' onClick={onToggle}>
      <span><strong style={{ color: "white" }}>+ Post new item</strong></span>
    </Box>
    <Collapse in={isOpen} animateOpacity>
      <NewListingForm onInsert={handleInsert} />
    </Collapse>
  </>
}

export default UserListings