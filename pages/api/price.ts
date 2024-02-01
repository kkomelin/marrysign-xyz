import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  price?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    res.status(404).json({ error: '404' })
    return
  }

  const { key } = req.query

  if (process.env.NEXT_PUBLIC_LOCAL_PRICE_API_KEY !== key) {
    res.status(403).json({ error: '403' })
    return
  }

  const API_KEY = process.env.COINSTATS_API_KEY || ''

  const sdk = api('@coinstatsopenapi/v1.0#1o8o2ilr4uy9pu')
  sdk.auth(API_KEY)

  try {
    const data = await sdk.coinController_coinItem({
      currency: 'USD',
      coinId: 'ethereum',
    })
    res.status(200).json({ price: data.price })
  } catch (e) {
    res.status(404).json({ error: 'Price is not available atm.' })
  }
}
