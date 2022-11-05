import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState } from "react"

type Props = {
  onInsert: () => void
}

export const NewListingForm = ({ onInsert }: Props) => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const submit = async (name: string, description: string) => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const inserts = {
        name,
        description,
        seller: user.id
      }

      let { data, error } = await supabase.from('listings').insert(inserts)
      if (error) throw error
      setLoading(false)
      onInsert()
    } catch (e) {

    }
  }

  return <Box my='4' px='4' py='4' borderWidth='1px' borderRadius='lg'>
    <VStack spacing={2} alignItems='flex-start'>
      <Input placeholder='Name' onChange={e => setName(e.target.value)} />
      <Textarea placeholder='Describe your item' onChange={e => setDescription(e.target.value)} />
      Picture Input
      <Button
        mt={4}
        px='10'
        onClick={() => submit(name, description)}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>

  </Box>
}