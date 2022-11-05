import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

type Props = {
  url: string | null
}

export const UploadImage = ({ url }: Props) => {
  const supabase = useSupabaseClient()

  const [uploading, setUploading] = useState(false)
  const [id, setId] = useState<string | null>(null)
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


  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const id = uuidv4()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      //onUpload(filePath)
      setId(id)
      console.log(fileName)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return <>
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Image"
          className="image"
          style={{ height: 100, width: 100 }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: 100, width: 100 }} />
      )}
      <div style={{ width: 100 }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  </>
}