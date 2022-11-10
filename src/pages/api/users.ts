import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Vagner' },
    { id: 2, name: 'Nolita' },
    { id: 3, name: 'Cleber' },
  ]

  return response.json(users)
}