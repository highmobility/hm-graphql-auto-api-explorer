import axios from 'axios'

export const setInitialConfig = async (data) => {
  const res = await axios.post('api/config', data)

  return res
}
