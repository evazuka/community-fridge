import { Box, Heading} from "@chakra-ui/react"
import { useSupabaseClient} from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"

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
                .select('id, name, description')
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
      {listings.map(({ name, description }, key) => <Listing key={key} name={name} description={description} />)}
    </Box>
  </>

}

export const Listing = ({ name, description }: { name: string, description: string }) => {
    return <Box my='4' px='16' py='4' borderWidth='1px' borderRadius='lg'>
      {name} - {description}
    </Box>
  }

export default AllListings