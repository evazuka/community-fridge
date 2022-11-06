import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import NextImage from 'next/image'

type Props = {
  url: string | null
  onDownload: (downloadedPath: string) => void
  clickable?: boolean
}

export const Image = ({ url, onDownload, clickable = false }: Props) => {
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
      onDownload(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  if (imageUrl === null) return <NextImage
    src="https://via.placeholder.com/100?text=?"
    alt="image"
    className="image"
    width={100}
    height={100}
    style={{ maxHeight: 100, objectFit: 'cover' }}
    onClick={onOpen}
  />

  return <><NextImage
    src={imageUrl}
    alt="iamge"
    className="image"
    width={100}
    height={100}
    style={{ maxHeight: 100, objectFit: 'cover' }}
  />
  </>
}

export default Image