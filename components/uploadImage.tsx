import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Image } from './image'
import { useDropzone } from 'react-dropzone'

type Props = {
  onUpload: (imageUrl: string) => void
}

export const UploadImage = ({ onUpload }: Props) => {
  const supabase = useSupabaseClient()

  const [uploading, setUploading] = useState(false)
  const [id, setId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const uploadAvatar = useCallback(async (files: File[]) => {
    console.log(onUpload)
    try {
      setUploading(true)

      const id = uuidv4()
      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }
      onUpload(filePath)

      setId(id)
      setImageUrl(fileName)
      console.log(fileName)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }, [setId, setImageUrl, onUpload, supabase.storage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: uploadAvatar })

  return <>
    <div>
      {imageUrl ? (
        <div style={{ display: 'flex' }}>
          <Image url={imageUrl} onDownload={() => { }} />
          <div className="avatar no-image" style={{ marginLeft: '10px' }}><p>+</p></div>
        </div>
      ) : (
        <div {...getRootProps()} className="avatar no-image">
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>-</p> :
              <p>+</p>
          }
        </div>
      )}
    </div>
  </>
}