import axios from 'axios'

export const setConfig = async (data) => {
  const res = await axios.post('api/config', data)

  return res
}
