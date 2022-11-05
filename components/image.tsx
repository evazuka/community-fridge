import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import NextImage from 'next/image'

type Props = {
  url: string | null
}

export const Image = ({ url }: Props) => {
  const supabase = useSupabaseClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from('images').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  return <><img
    src={imageUrl}
    alt="iamge"
    className="image"
    style={{ height: 100, width: 100 }}
    onClick={onOpen}
  />
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent height='75%' background='transparent' boxShadow='none' onClick={onClose}>
        <ModalBody>
          <NextImage src={imageUrl!} alt='image' fill style={{ objectFit: 'contain' }} />
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
}

export default Image