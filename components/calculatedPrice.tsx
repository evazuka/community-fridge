import { Badge, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonBiking, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'

type Props = {
  price: number
  onLoaded: () => void
}

export const CalculatedPrice = ({ price, onLoaded }: Props) => {
  const [loading, setLoading] = useState(true)
  const [fee, setFee] = useState(0)
  const [estimate, setEstimate] = useState('')

  useEffect(() => {
    getFee()
  }, [])

  const getFee = async () => {
    try {
      const response = await fetch('/api', { method: 'GET' })
      const data = await response.json()
      setFee(price)
      setEstimate(data['time_estimate_minutes'])
      onLoaded()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return <>
    <div><FontAwesomeIcon icon={faMoneyBill1Wave} style={{ marginRight: '12px', width: '20px' }} />Delivery fee: <Skeleton isLoaded={!loading} display='inline-block'>
      <span><strong style={{ color: "rgb(0, 157, 224)" }}>€{fee}</strong></span>
    </Skeleton>
    </div>
    <div><FontAwesomeIcon icon={faPersonBiking} style={{ marginRight: '12px', width: '20px' }} />Delivery in <Skeleton isLoaded={!loading} display='inline-block'>
      <span>{estimate} minutes</span>
    </Skeleton></div>
  </>

}
export default CalculatedPrice