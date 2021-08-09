import axios from 'axios'

export const API_URL = `${window.location.protocol}//${
  window.location.hostname
}${window.location.hostname === 'localhost' ? ':3001' : ''}/api`
export const AUTH_CALLBACK_URL = `${API_URL}/auth/callback`

export const setConfig = async (config) => {
  const { data = [] } = await axios.post(`${API_URL}/config`, config)

  return data
}

export const fetchVehicles = async () => {
  const { data = [] } = await axios.get(`${API_URL}/vehicles`)

  return data
}

export const fetchVehicleData = async (vehicleId, properties) => {
  const { data = [] } = await axios.post(
    `${API_URL}/vehicle-data/${vehicleId}`,
    { properties }
  )

  return data
}
