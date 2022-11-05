import { NextApiRequest, NextApiResponse } from "next"

type Data = {}

const woltApi = `https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.WOLT_MERCHANT_ID}`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const response = await fetch(woltApi + "/delivery-order", {
      method: "POST",
      body: JSON.stringify(createOrderRequest()),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WOLT_API_TOKEN_KEY}`,
      },
    })
    const data = await response.json()

    res.status(200).json(data)
  } else if (req.method === "GET") {
    const response = await fetch(woltApi + "/delivery-fee", {
      method: "POST",
      body: JSON.stringify(createFeeRequest()),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WOLT_API_TOKEN_KEY}`,
      },
    })
    const data = await response.json()

    res.status(200).json(data)
  }
}

const createFeeRequest = () => ({
  pickup: {
    location: {
      formatted_address: "Otakaari 24, 02150 Espoo",
    },
  },
  dropoff: {
    location: {
      formatted_address: "Arkadiankatu 3-6 3rd floor, 00100 Helsinki",
    },
  },
})

const createOrderRequest = () => ({
  pickup: {
    location: {
      formatted_address: "Otakaari 24, 02150 Espoo",
    },
    comment: "The box is in front of the door",
    contact_details: {
      name: "Dmitry",
      phone_number: "+358123456789",
      send_tracking_link_sms: false,
    },
  },
  dropoff: {
    location: {
      formatted_address: "Eteläinen Rautatiekatu 10, 00100 Helsinki",
    },
    contact_details: {
      name: "Eva",
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
