import axios from 'axios'

export const API_URL = `https://${window.location.hostname}${
  window.location.hostname === 'localhost' ? ':3001' : ''
}/api`

export const AUTH_CALLBACK_URL = `${API_URL}/auth/callback`

export const setAppConfig = async (config) => {
  const { data = [] } = await axios.post(`${API_URL}/app-config`, config)

  return data
}

export const fetchAppConfig = async () => {
  const { data = [] } = await axios.get(`${API_URL}/app-config`)

  return data
}

export const resetApp = async () => {
  const { data = [] } = await axios.delete(`${API_URL}/app-config`)

  return data
}

export const updateConfig = async (config) => {
  const { data = [] } = await axios.put(`${API_URL}/config`, config)

  return data
}

export const fetchConfig = async () => {
  const { data = [] } = await axios.get(`${API_URL}/config`)

  return data
}

export const fetchProperties = async () => {
  const { data = [] } = await axios.get(`${API_URL}/properties`)

  return data
}

export const updateProperties = async (properties) => {
  const { data = [] } = await axios.put(`${API_URL}/properties`, { properties })

  return data
}

export const fetchVehicles = async () => {
  const { data = [] } = await axios.get(`${API_URL}/vehicles`)

  return data
}

export const deleteVehicle = async (vehicleVin) => {
  const { data = [] } = await axios.delete(
    `${API_URL}/vehicles/${vehicleVin}/delete`
  )

  return data
}

export const fetchVehicleData = async (vehicleId, properties) => {
  const { data = [] } = await axios.post(
    `${API_URL}/vehicles/data/${vehicleId}`,
    { properties }
  )

  return data
}
