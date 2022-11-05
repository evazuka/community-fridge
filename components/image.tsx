import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"

type Props = {
  url: string | null
}

export const Image = ({ url }: Props) => {
  const supabase = useSupabaseClient()

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

  return <img
    src={imageUrl}
    alt="iamge"
    className="image"
    style={{ height: 100, width: 100 }}
  />
}

export default Image