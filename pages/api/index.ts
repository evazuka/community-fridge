import { NextApiRequest, NextApiResponse } from "next"

type Data = {}

const woltApi = `https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.WOLT_MERCHANT_ID}/delivery-order`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(woltApi, {
    method: "POST",
    body: JSON.stringify(createRequest()),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WOLT_API_TOKEN_KEY}`,
    },
  })
  const data = await response.json()

  res.status(200).json(data)
}

const createRequest = () => ({
  pickup: {
    location: {
      formatted_address: "Arkadiankatu 3-6",
    },
    comment: "The box is in front of the door",
    contact_details: {
      name: "John Doe",
      phone_number: "+358123456789",
      send_tracking_link_sms: false,
    },
  },
  dropoff: {
    location: {
      formatted_address: "Otakaari 24, 02150 Espoo",
    },
    contact_details: {
      name: "John Doe's wife",
      phone_number: "+358123456789",
      send_tracking_link_sms: false,
    },
    comment: "Leave at the door, please",
  },
  customer_support: {
    email: "string",
    phone_number: "string",
    url: "string",
  },
  merchant_order_reference_id: null,
  is_no_contact: true,
  contents: [
    {
      count: 1,
      description: "plastic bag",
      identifier: "12345",
      tags: [],
    },
  ],
  tips: [],
  min_preparation_time_minutes: 10,
  scheduled_dropoff_time: null,
})
