import { Box, Button, Grid, GridItem, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, useDisclosure, VStack } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"
import { Image } from './image'
import NextImage from 'next/image'
import CalculatedPrice from "./calculatedPrice"

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

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const Listing = ({ name, description, imageUrl }: { name: string, description: string, imageUrl: string | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setLoading] = useState(false)
  const [priceLoading, setPriceLoading] = useState(true)
  const [imagePath, setImagePath] = useState<string | null>(null)

  const price = useMemo(() => randomIntFromInterval(100, 500) / 100, [])

  const placeOrder = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api', { method: 'POST' })
      const data = await response.json()
      const trackingUrl = data['tracking']['url']
      console.log(trackingUrl)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return <>
    <Box my='4' px='2' py='2' onClick={() => {
      onOpen()
      setPriceLoading(true)
    }} cursor='pointer'
      className="card">
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
        <GridItem area={'description'} style={{ textOverflow: 'ellipsis', wordWrap: 'break-word' }}>
          {description}
        </GridItem>
        <GridItem area={'image'} width='100px'>
          {imageUrl
            ? <Image url={imageUrl} onDownload={setImagePath} />
            : <img
              src='https://via.placeholder.com/100?text=?'
              alt="image"
              className="image"
              style={{ height: 100, width: 100 }}
            />}
        </GridItem>
      </Grid>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems='start'>
            <Box>
              {imageUrl && <NextImage alt="image" src={imagePath!} width='400' height='100' style={{ maxHeight: '300px', objectFit: 'cover' }} />}
            </Box>
            <Box>
              <CalculatedPrice price={price} onLoaded={() => setPriceLoading(false)} />
            </Box>
            <Box>
              {description}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter alignItems='end'>
          <Button isLoading={isLoading} mr={3} onClick={placeOrder} background='#009DE0' _hover={{ background: '#14A5E2' }}>
            <Stack direction='row' spacing={16}>
              <Box color='white'>Order now</Box>
              <Box color='white'><Skeleton isLoaded={!priceLoading} display='inline-block'>
                <span><strong style={{ color: "white" }}>€{price}</strong></span>
              </Skeleton></Box>
            </Stack>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default AllListings