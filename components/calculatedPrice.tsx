import { Badge, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react"

type Props = {
  price: number
  onLoaded: () => void
}

export const CalculatedPrice = ({ price, onLoaded }: Props) => {
  const [loading, setLoading] = useState(true)
  const [fee, setFee] = useState(0)

  useEffect(() => {
    getFee()
  }, [])

  const getFee = async () => {
    try {
      const response = await fetch('/api', { method: 'GET' })
      const data = await response.json()
      setFee(price)
      onLoaded()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return <>
    <p></p>
    <p>Delivery fee: <Skeleton isLoaded={!loading} display='inline-block'>
      <span><strong style={{ color: "rgb(0, 157, 224)" }}>€{fee}</strong></span>
    </Skeleton></p>
  </>

}
export default CalculatedPrice