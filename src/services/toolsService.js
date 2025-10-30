import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const TOOLS_URL = process.env.URL_PLUGA_TOOLS

export const fetchTools = async () => {
  try {
    const response = await axios.get(TOOLS_URL)
    return response.data
  } catch (error) {
    throw new Error(error.message || error)
  }
}