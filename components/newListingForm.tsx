import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useCallback, useState } from "react"
import { UploadImage } from "./uploadImage"

type Props = {
  onInsert: () => void
}

export const NewListingForm = ({ onInsert }: Props) => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleUpload = useCallback((imageUrl: string) => setImageUrl(imageUrl), [setImageUrl])

  const submit = async (name: string, description: string, imageUrl: string) => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const inserts = {
        name,
        description,
        imageUrl,
        seller: user.id
      }

      let { data, error } = await supabase.from('listings').insert(inserts)
      if (error) throw error
      setLoading(false)
      onInsert()
      setName('')
      setDescription('')
      setImageUrl('')
    } catch (e) {

    }
  }

  return <Box my='4' px='4' py='4' borderWidth='1px' borderRadius='lg'>
    <VStack spacing={2} alignItems='flex-start'>
      <Input placeholder='Name' onChange={e => setName(e.target.value)} />
      <Textarea placeholder='Describe your item' onChange={e => setDescription(e.target.value)} />
      <UploadImage onUpload={handleUpload} />
      <Button
        mt={4}
        px='10'
        onClick={() => submit(name, description, imageUrl)}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>

  </Box>
}