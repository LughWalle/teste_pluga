import axios from 'axios'

const TOOLS_URL = process.env.REACT_APP_URL_PLUGA_TOOLS

export const fetchTools = async () => {
  try {
    const response = await axios.get(TOOLS_URL)
    
    await new Promise(resolve => setTimeout(resolve, 2000))

    return response.data
  } catch (error) {
    throw new Error(error.message || error)
  }
}