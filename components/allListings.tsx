import { Box, Button, Grid, GridItem, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { Image } from './image'

export const AllListings = () => {
  const supabase = useSupabaseClient()
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
      if (error) throw error
      setListings(data!)
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  return <>
    <Box>
      <Heading my='2'>What you can take:</Heading>
      {listings.map(({ name, description, imageUrl }, key) => <Listing key={key} name={name} description={description} imageUrl={imageUrl} />)}
    </Box>
  </>

}

export const Listing = ({ name, description, imageUrl }: { name: string, description: string, imageUrl: string | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    return
    const response = await fetch('/api')
    const data = await response.json()
    console.log(data)
  }

  return <>
    <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg'>
      <Grid
        templateAreas={`"header image"
                  "description image"
                  "button image"`}
        gridTemplateRows='repeat(3, 1fr)'
        gridTemplateColumns='repeat(2, 1fr)'
        h='100px'
      >
        <GridItem area={'header'}>
          <Heading size='md'>{name}</Heading>
        </GridItem>
        <GridItem area={'description'}>
          {description}
        </GridItem>
        <GridItem area={'image'}>
          {imageUrl
            ? <Image url={imageUrl} />
            : <img
              src='https://via.placeholder.com/100?text=?'
              alt="image"
              className="image"
              style={{ height: 100, width: 100 }}
            />}
        </GridItem>
        <GridItem area={'button'}>
          <Button onClick={onOpen}>want this!</Button>
        </GridItem>
      </Grid>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Yo
        </ModalBody>

        <ModalFooter alignItems='end'>
          <Button isLoading={isLoading} mr={3} onClick={() => setLoading(true)} background='#009DE0' color='white' _hover={{ background: '#14A5E2' }}>
            Order now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default AllListings